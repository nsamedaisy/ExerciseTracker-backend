const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    userId: String,
    username: String,
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: String,
  },
  {
    versionKey: false,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

