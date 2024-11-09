const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Comments",
        default: []
    }
})

const Posts = mongoose.model("Posts", postSchema);
module.exports = {
    Posts
}