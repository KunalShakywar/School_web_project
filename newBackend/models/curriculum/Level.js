import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  name: {
    type: String,

    enum: [
      "Pre Primary",
      "Primary",
      "Middle",
      "Secondary",
      "Senior Secondary",
    ],

    required: true,
  },
});

const Level = mongoose.model("Level", levelSchema);

export default Level;