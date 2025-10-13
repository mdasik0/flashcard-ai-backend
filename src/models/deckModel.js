const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    deckName: {type:String, trim:true, required: true, minlength:3, maxlength:50},
    creatorId: {type:String, required:true},
    deckImage: {type:String}, privacy: {type:Boolean, required:true}, active: {type:Boolean, required: true}
},{timestamps: true})

module.exports = mongoose.model("Deck",deckSchema)