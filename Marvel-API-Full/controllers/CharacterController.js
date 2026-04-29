import Character from "../models/Character.js";

// GET /api/characters — Get all characters
export const getAllCharacters = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const characters = await Character.findAll(limit);
    res.status(200).json({ success: true, count: characters.length, data: characters });
  } catch (error) {
    next(error);
  }
};

// GET /api/characters/:id — Get character by id
export const getCharacterById = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ success: false, message: "Character not found" });
    }
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    next(error);
  }
};

// GET /api/characters/search?name=spider — Search characters by name
export const searchCharacters = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ success: false, message: "Please provide a name query parameter" });
    }

    // Try exact match first, then partial
    let characters = await Character.findExactName(name);
    if (!characters || characters.length === 0) {
      characters = await Character.findByName(name);
    }

    res.status(200).json({ success: true, count: characters.length, data: characters });
  } catch (error) {
    next(error);
  }
};

// GET /api/characters/autocomplete?prefix=iron — Autocomplete suggestions
export const autocompleteCharacters = async (req, res, next) => {
  try {
    const { prefix } = req.query;
    if (!prefix || prefix.length < 4) {
      return res.status(200).json({ success: true, data: [] });
    }
    const characters = await Character.nameStartsWith(prefix);
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    next(error);
  }
};

// GET /api/characters/random — Get a random character
export const getRandomCharacter = async (req, res, next) => {
  try {
    const character = await Character.findRandom();
    if (!character) {
      return res.status(404).json({ success: false, message: "No characters found" });
    }
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    next(error);
  }
};

// POST /api/characters — Create a new character
export const createCharacter = async (req, res, next) => {
  try {
    const { marvel_id, name, description, thumbnail_url } = req.body;
    if (!marvel_id || !name || !thumbnail_url) {
      return res.status(400).json({
        success: false,
        message: "Please provide marvel_id, name, and thumbnail_url",
      });
    }
    const character = await Character.create({ marvel_id, name, description, thumbnail_url });
    res.status(201).json({ success: true, data: character });
  } catch (error) {
    next(error);
  }
};

// PUT /api/characters/:id — Update a character
export const updateCharacter = async (req, res, next) => {
  try {
    const character = await Character.updateById(req.params.id, req.body);
    if (!character) {
      return res.status(404).json({ success: false, message: "Character not found" });
    }
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/characters/:id — Delete a character
export const deleteCharacter = async (req, res, next) => {
  try {
    const character = await Character.deleteById(req.params.id);
    if (!character) {
      return res.status(404).json({ success: false, message: "Character not found" });
    }
    res.status(200).json({ success: true, message: "Character deleted", data: character });
  } catch (error) {
    next(error);
  }
};
