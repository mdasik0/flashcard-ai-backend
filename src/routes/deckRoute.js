const express = require('express');
const { createDeck, updateDeck, getDecks, deleteDeck, setActiveDeck } = require('../controllers/deckController');
const router = express.Router();

router.post('/deck',createDeck);
router.patch('/deck/:deckId',updateDeck);
router.patch('/set-active-deck/:deckId',setActiveDeck);
router.get('/decks/:creatorId',getDecks);
router.delete('/deck/:deckId',deleteDeck);

module.exports = router;