const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        location: {
            type: String,
            required: true
        },
        userCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            min: 0
        },
        dislikes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", postSchema)

module.exports = Post;

