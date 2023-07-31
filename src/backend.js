const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require('dotenv')
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());

app.use(express.json());

dotenv.config()


const adminSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  addedBy: String
});

const Admin = mongoose.model("admin", adminSchema);
const Course = mongoose.model("course", courseSchema);
mongoose.connect(process.env.key);

let ADMINS = [];

let COURSES = [];


const SECRET = process.env.secret;

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const obj = { username, password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();

    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  const { username } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/courses", authenticateJwt, async (req, res) => {
  const course = req.body;
  course.addedBy= req.user.username;
  const courseExists = await Course.findOne({ course });
  if (courseExists) res.status(403).json({ message: "Course already exists" });
  else {
    const newCourse = new Course(course);
    await newCourse.save();
    res.json({ message: "Course created successfully", course});
  }
});

app.get("/admin/courses", authenticateJwt, async (req, res) => {
  const addedby = req.user.username;
  const courses = await Course.find({addedBy: addedby})
  res.json({ courses });
});

app.listen(3000, () => console.log("Server running on port 3000"));




