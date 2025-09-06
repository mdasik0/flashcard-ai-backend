const express = require('express');
const router = express.Router();

router.get('/generate-flashcard', async (req, res) => {
    try {
        const {question} = req.body;
        res.send(question)
    } catch (error) {
        console.log("Error generating flashcard", error);
        res.status(500).send({success: false, message: "Internal Server Error"});
    }
})

module.exports = router;