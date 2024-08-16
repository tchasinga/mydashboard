import mongoose from "mongoose";

const AplySchema = new mongoose.Schema({
    fullName : {
        type: String,
    },
    email: {
        type: String,
    },
    typeofservices: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrls: {
        type: Array,
        trim: true,
    },
}, {timestamps: true});

const Aply = mongoose.model("Aply", AplySchema);
export default Aply;