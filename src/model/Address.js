import mongoose from "mongoose";

const NewAddressSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    fullName: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
}, {
    timestamps: true
})

const Address = mongoose.models.Address || mongoose.model("Address", NewAddressSchema);
export default Address;