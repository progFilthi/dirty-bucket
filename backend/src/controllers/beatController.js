import Beat from "../models/Beat.js";
import { uploadBufferToS3 } from "../utils/uploadToS3.js";

export const createBeat = async (req, res) => {
  try {
    const { title, key, bpm, price } = req.body;

    if (!req.files?.audio || !req.files?.cover) {
      return res
        .status(400)
        .json({ message: "Both audio and cover files are required." });
    }

    const audioUrl = await uploadBufferToS3(req.files.audio[0], "beats/");
    const coverUrl = await uploadBufferToS3(req.files.cover[0], "beatCovers/");

    const newBeat = new Beat({ title, key, bpm, price, audioUrl, coverUrl });
    await newBeat.save();

    res
      .status(201)
      .json({ message: "Beat uploaded successfully", beat: newBeat });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const getBeats = async (req, res) => {
  try {
    const beats = await Beat.find().sort({ createdAt: -1 });
    res.status(200).json(beats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch beats", error: error.message });
  }
};

export const getBeatById = async (req, res) => {
  try {
    const beat = await Beat.findById(req.params.id);
    if (!beat) return res.status(404).json({ message: "Beat not found" });
    res.status(200).json(beat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch beat", error: error.message });
  }
};

export const updateBeat = async (req, res) => {
  try {
    const updated = await Beat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Beat not found" });
    res.status(200).json({ message: "Beat updated", beat: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update beat", error: error.message });
  }
};

export const deleteBeat = async (req, res) => {
  try {
    const deleted = await Beat.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Beat not found" });
    res.status(200).json({ message: "Beat deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete beat", error: error.message });
  }
};
