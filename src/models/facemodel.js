import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    descriptor: {
        type: [Number],
        required: true,
    },
}, {
    timestamps: true
}
)

const Face = mongoose.models.Face || mongoose.model("Face", userSchema)

export default Face