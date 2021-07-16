const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
      date:{
        type:String,
        required:true
      },
      venue:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      time:{
        type:String,
        required:true
      },
      Price:{
        type:Number,
        required:true
      },
})
module.exports = mongoose.model("Events", PostSchema);