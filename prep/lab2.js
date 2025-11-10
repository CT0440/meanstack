const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/meanlab", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Create Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

// Create Model
const Student = mongoose.model("Student", StudentSchema);

// RESTful APIs
// 1. GET all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 2. POST new student
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Student Added Successfully" });
});

// 3. PUT update student
app.put("/students/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Student Updated Successfully" });
});

// 4. DELETE student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted Successfully" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
