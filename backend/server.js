const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/post", require("./routes/post"));

app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`));
