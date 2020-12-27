const mongoose = require("mongoose");

const marathonSchema = new mongoose.Schema({
  marathonName: String,
  marathonDate: String,
  marathonText: String,
  marathonImg: String,
  marathonColor: String,
  exercise: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
});

const Marathon = mongoose.model("Marathon", marathonSchema);

module.exports = Marathon;
