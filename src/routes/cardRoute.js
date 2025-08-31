const express = require("express");
const {
  createFlashcard,
  getFlashcardsByDeckId,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/cardController");
const router = express.Router();

router.post("/flashcard", createFlashcard);
router.get("/flashcards/:deckId", getFlashcardsByDeckId);
router.patch("/flashcard/:flashcardId", updateFlashcard);
router.delete("/flashcard/:flashcardId", deleteFlashcard);

router.get("/flashcards", (req, res) => {
  return res.send("Please enter a deckId");
});
router.patch("/flashcard", (req, res) => {
  return res.send("Please enter a flashcardId to update.");
});
router.delete("/flashcard", (req, res) => {
  return res.send("Please enter a flashcardId to delete.");
});

module.exports = router;
