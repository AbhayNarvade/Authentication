import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', "seller"]
    },
    refreshToken: {
        type: String,
    }
})

const userModel = mongoose.model("users", userSchema);

export default userModel;