import express from "express";
import {
  getAllCharacters,
  getCharacterById,
  searchCharacters,
  autocompleteCharacters,
  getRandomCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/CharacterController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

// These must come before /:id
router.get("/search", searchCharacters);
router.get("/autocomplete", autocompleteCharacters);
router.get("/random", getRandomCharacter);

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
