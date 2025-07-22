import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sender_email: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver_email: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
}
)

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)

export default Contact