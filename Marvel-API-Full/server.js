import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import characterRoutes from "./routes/CharacterRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize Supabase client
import "./config/db.js";

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve frontend from /public folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/characters", characterRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Marvel API server running on http://localhost:${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/characters`);
});
