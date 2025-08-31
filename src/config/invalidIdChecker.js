const mongoose = require('mongoose')

const invalidIdCheck = (_id, fieldName) => {
  //this function is for checking if the id is "mongodb" valid or not
  if (!_id) {
    return console.log("enter a _id");
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return { isValid: false, message: `Invalid ${fieldName} Format`}
  }
  return { isValid: true };
};

module.exports = invalidIdCheck