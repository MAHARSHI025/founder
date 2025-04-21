import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true,
    },

    wholiked:{
        type: Array
    },

    wholoved:{
        type: Array
    }

}
)

const Liken = mongoose.models.Liken || mongoose.model("Liken", likeSchema)

export default Liken