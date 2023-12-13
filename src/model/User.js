import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: string,
    email: {
        type: string,
        require: true,
        unique: true
    },
    password: string,
    role: string,
},{
    timestamps: true,
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;