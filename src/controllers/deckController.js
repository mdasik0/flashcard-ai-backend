const { default: mongoose } = require("mongoose");
const Deck = require("../models/deckModel");
const Card = require("../models/cardModel");

const createDeck = async (req, res) => {
  try {
    const deckData = req.body;
    // validate deckData
    if (!deckData.deckName || !deckData.creatorId) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields : deckName or creatorId",
      });
    }
    // set active field
    const deckExist = await Deck.find({ creatorId: deckData?.creatorId });
    if (deckExist.length <= 0) {
      const deckDataWithActiveField = { ...deckData, active: true };
      const result = await Deck.create(deckDataWithActiveField);
      return res
        .status(200)
        .send({ success: true, message: "New deck created", data: result });
    }
    else {
      const deckDataWithActiveField = { ...deckData, active: false };
      const result = await Deck.create(deckDataWithActiveField);
      return res
      .status(200)
      .send({ success: true, message: "New deck created", data: result });
    }
  } catch (error) {
    console.log("There was an error creating Deck.", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const updateDeck = async (req, res) => {
  try {
    const deckId = req.params.deckId;
    // possible changes : deckName, deckImage, privacy
    const changes = req.body;

    const _id = new mongoose.Types.ObjectId(deckId);
    const result = await Deck.updateOne(
      { _id },
      {
        $set: changes,
      }
    );
    if (result.matchedCount === 0) {
      res
        .status(404)
        .send({ success: false, message: "Nothing found to be updated." });
    }
    if (result.modifiedCount === 0) {
      res.status(200).send({
        success: false,
        message: "there is nothing to be updated",
      });
    }
    res.status(200).send({
      success: true,
      message: "Deck has been updated Successfully",
      data: result,
    });
  } catch (error) {
    console.log("There was an error updating deck", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
const getDecks = async (req, res) => {
  try {
    const creatorId = req.params.creatorId;
    console.log("user loging", creatorId);
    // const idValidation = invalidIdCheck(creatorId, "Creator Id");
    // if (!idValidation.isValid) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "your id is invalid. please provide a correct one.",
    //   });
    // }
    const result = await Deck.find({ creatorId: creatorId });

    res.status(200).send({ success: true, data: result });
  } catch (error) {
    console.log("There was an error getting all the decks.", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
const deleteDeck = async (req, res) => {
  try {
    const deckId = req.params.deckId;
    const _id = new mongoose.Types.ObjectId(deckId);
    const result = await Deck.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No deck found to be deleted." });
    }
    const deleteAllCards = await Card.deleteMany({ deckId: _id });
    res.status(200).send({
      success: true,
      message:
        "Deck and all the cards inside the deck have been deleted successfully.",
      data: deleteAllCards,
    });
  } catch (error) {
    console.log("There was an error deleting the deck.", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = { createDeck, updateDeck, getDecks, deleteDeck };
