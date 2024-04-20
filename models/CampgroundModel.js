const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: String,
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model('campgroundSchema',campgroundSchema)