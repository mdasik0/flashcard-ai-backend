const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 300,
    },
    answer: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 300,
    },
    deckId: {
      type: String,
      required: true,
    },
    deckName: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", Card)