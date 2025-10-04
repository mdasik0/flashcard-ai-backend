const express = require('express');
const generateFlashcard = require('../lib/ai');
const router = express.Router();

router.post('/generate-flashcard', async (req, res) => {
    try {
        const {question, deckName} = req.body;

        if(question === undefined || question.length === "" || typeof question !== 'string'){
            return res.status(400).send({success: false, message: "Question is required and must be a string"});
        }
        const trimmedQuestion = question.trim();

        if(trimmedQuestion.length <= 10){
            return res.status(400).send({success: false, message: "Question must be at least 10 characters long",queLength : trimmedQuestion.length});
        }
        if(trimmedQuestion.length > 100){
            return res.status(400).send({success: false, message: "Question must be less than 100 characters long",queLength : trimmedQuestion.length});
        }

        const result = await generateFlashcard(trimmedQuestion, deckName);
        if(!result.success){
            return res.status(500).send({success: false, message: "Failed to generate flashcard"});
        }
        const response = {success: true, response:{question : trimmedQuestion, answer: result.response}}
        
        console.log('result sent to client:', response)
        return res.status(200).json(response)
    } catch (error) {
        console.log("Error generating flashcard", error);
        res.status(500).send({success: false, message: "Internal Server Error"});
    }
})

module.exports = router;