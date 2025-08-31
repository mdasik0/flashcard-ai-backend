const { default: mongoose } = require("mongoose");
const Card = require("../models/cardModel");
const invalidIdCheck = require("../config/invalidIdChecker");



const createFlashcard = async (req, res) => {
  try {
    const newFlashcardData = req.body;
    const expectedFields = [
      "deckName",
      "deckId",
      "question",
      "answer",
      "userId",
    ];

    const incomingFields = Object.keys(newFlashcardData);

    const missingFields = expectedFields.filter(
      (key) => !incomingFields.includes(key)
    );

    if (missingFields) {
      return res.status(400).send({
        success: false,
        message: "Flashcard object validation failed: missing required fields",
        missingFields,
      });
    }

    await Card.create(newFlashcardData);

    res
      .status(200)
      .send({ success: true, message: `Flashcard is added to the Deck` });
  } catch (error) {
    console.log("There was an error adding the Flashcard.");
    res
      .status(400)
      .send({ success: false, message: "internal server error", error: error });
  }
};

const getFlashcardsByDeckId = async (req, res) => {
  try {
    const deckId = req.params.deckId;

    const idValidation = invalidIdCheck(deckId, "Deck ID");
    if (!idValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "your id is invalid. please provide a correct one.",
      });
    }

    const result = await Card.find({ deckId });

    if (result.length <= 0) {
      return res
        .status(200)
        .send({ success: true, message: "There is no flashcard in this deck" });
    }

    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    console.log("There was an error finding the Flashcards", error);
    return res
      .status(400)
      .send({ success: false, message: "Internal Server Error", error: error });
  }
};

const updateFlashcard = async (req, res) => {
  try {
    const flashcardId = req.params.flashcardId;

    const idValidation = invalidIdCheck(flashcardId, "Flashcard ID");
    if (!idValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "your id is invalid. please provide a correct one.",
      });
    }

    const updateData = req.body;
    const { question, answer } = updateData;
    if (!question && !answer) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough data to update." });
    }
    const _id = new mongoose.Types.ObjectId(flashcardId);
    const result = await Card.updateOne({ _id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Flashcard not found" });
    }
    if (result.modifiedCount === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes made. Data is already up to date.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Flashcard updated successfully",
    });
  } catch (error) {
    console.log("There was an error in updating flashcard", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

const deleteFlashcard = async (req, res) => {
  try {
    const flashcardId = req.params.flashcardId;
    const idValidation = invalidIdCheck(flashcardId, "Flashcard ID");
    if (!idValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "your id is invalid. please provide a correct one.",
      });
    }
    const _id = new mongoose.Types.ObjectId(flashcardId);

    const response = await Card.deleteOne(_id);

    if(response.deletedCount <= 0){
      return res.status(404).send({success:false, message: 'Flashcard not found, nothing deleted'})
    }
    res.json({
      success: true,
      message: "Flashcard successfully deleted",
      response,
    });
  } catch (error) {
    console.log({ message: "There was an error deleting flashcard", error });
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createFlashcard,
  getFlashcardsByDeckId,
  updateFlashcard,
  deleteFlashcard,
};
