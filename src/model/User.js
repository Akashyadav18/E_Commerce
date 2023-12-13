import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
},{
    timestamps: true,
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;