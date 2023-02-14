const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");
var port = process.env.PORT || 3002;
require("dotenv").config();

app.use(cors({ credentials: true, origin: process.env.REACT_APP_PORT }));
app.use(express.json());
// app.use(cookieParser());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.REACT_APP_MONGO_URL);

app.get("/test", (req, res) => {
  res.json("server ok");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.create({
      email,
      password,
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(port);
