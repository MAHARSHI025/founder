import mongoose from "mongoose";

const urlschema = new mongoose.Schema({

    website: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    other: {
        type: String,
    },
    

    verifytoken: String,
    verifytokenexpiry: Date,
}, {
    timestamps: true
}
)

const Url = mongoose.models.Url || mongoose.model("Url", urlschema)

export default Url