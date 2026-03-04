import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({

    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
    
}, {
    timestamps: true
}
)

const Request = mongoose.models.Request || mongoose.model("Request", requestSchema)

export default Request