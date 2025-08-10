import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    organization_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    bio: {
        type: String,
        // required: true,
    },
    about: {
        type: String,
        // required: true,
    },
    profileimage: {
        type: String,
        // required: true,
        default: "hello.png"
    },
    coverimage: {
        type: String,
        // required: true,
        default: "hello.png"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    badges: {
        type: Array,
        default: []
    },
    isverified: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
    },
    likecount: {
        type: Number,
        default: 0,
    },
    website: {
        type: String,
        default:''
    },
    instagram: {
        type: String,
        default:''
    },
    linkedin: {
        type: String,
        default:''
    },

    verifytoken: String,
    verifytokenexpiry: Date,
}, {
    timestamps: true
}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User