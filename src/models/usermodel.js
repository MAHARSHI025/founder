import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
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
    profileimage: {
        type: String,
        // required: true,
        default: "hello.png"
    },
    gender: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    isverified: {
        type: Boolean,
        default: false
    },
    typeofdate: {
        type: String,
        default: "relationship",
    },
    hoobies: {
        type: Array,
        default: []
    },
    addictions: {
        type: String,
        default: "None",
    },
    age: {
        type: Number,
        // required: true,
    },    
    city: {
        type: String,
        // required: true,
    },
    // likesby: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Liken',
    // },
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

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User