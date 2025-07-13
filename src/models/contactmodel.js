import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

    sender_email: {
        type: String,
        required: true,
    },
    receiver_email: {
        type: String,
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

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)

export default Contact