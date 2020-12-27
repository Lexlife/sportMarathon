const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  points: Number ,
  doneExercise: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  bougthMarathon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Marathon" }],
  doneMarathon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Marathon" }],
 });

const User = mongoose.model("User", userSchema);

module.exports = User;
