import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api", uploadRoutes);

// connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
