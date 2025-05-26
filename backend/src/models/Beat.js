import mongoose from "mongoose";

const beatSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    key: { type: String, required: true },
    bpm: { type: Number, required: true },
    price: { type: Number, required: true },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Beat = mongoose.model("Beat", beatSchema);
export default Beat;
