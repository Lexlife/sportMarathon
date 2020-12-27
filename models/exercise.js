const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  exerciseName: String,
  exerciseText: String,
  exerciseImg: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
