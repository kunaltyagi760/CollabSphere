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
<<<<<<< HEAD
  const authHeader = req.header("Authorization");
=======
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });
>>>>>>> b98e5d7e77234b926974916cec47754fe5523c76

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided!" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded; // Ensure `req.user` is set
    // console.log("Decoded Token:", decoded); // Debugging line
    if (!req.user) return res.status(401).json({ message: "User not found" });

    req.user.id = req.user.userId.toString(); // Ensure it's a string
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
