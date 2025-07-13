import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    postimage: {
        type: String,
        required: true,
    },
    imageid: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likecount: {
        type: Number,
        default: 0,
    },

    verifytoken: String,
    verifytokenexpiry: Date,
}, {
    timestamps: true
}
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post