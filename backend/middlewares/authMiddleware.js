// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   // console.log(token);
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     req.body.userId = decoded.userId;
//     // console.log(req.body.userId);
//     req.body.username = decoded.name;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };



const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if Authorization header is missing or incorrect
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided!" });
  }

  // Extract token correctly
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debugging: Log decoded token
    // console.log("Decoded Token:", decoded);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "User not found" });
    }

    // Set user data in request (ensuring it's a string)
    req.user = {
      id: decoded.id.toString(),
    };

    next(); // Proceed to next middleware
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
