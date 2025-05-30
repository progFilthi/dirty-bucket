import mongoose from "mongoose";
import dotenv from "dotenv";
import Beat from "../src/models/Beat.js"; // adjust path if needed

dotenv.config(); // Loads MONGODB_URI from .env

async function migratePricesToString() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const beats = await Beat.find({});
    console.log(`Found ${beats.length} beats`);

    let updatedCount = 0;

    for (const beat of beats) {
      if (typeof beat.price === "number") {
        beat.price = beat.price.toFixed(2); // convert to string like "29.99"
        await beat.save();
        updatedCount++;
      }
    }

    console.log(`✅ Updated ${updatedCount} beats from number to string price`);
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

migratePricesToString();
