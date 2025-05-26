import express from "express";
import upload from "../middlewares/multer.js";
import {
  createBeat,
  getBeats,
  getBeatById,
  updateBeat,
  deleteBeat,
} from "../controllers/beatController.js";

const router = express.Router();

router.post(
  "/upload",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  createBeat
);

router.get("/beats", getBeats);
router.get("/beats/:id", getBeatById);
router.put("/beats/:id", updateBeat);
router.delete("/beats/:id", deleteBeat);

export default router;
