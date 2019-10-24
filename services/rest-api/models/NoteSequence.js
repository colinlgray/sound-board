const mongoose = require("mongoose");
const NoteSequenceSchema = new mongoose.Schema({
  board: [[{ notes: [String], synthName: String }]]
});
module.exports = mongoose.model("NoteSequence", NoteSequenceSchema);
