import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

        // Type: mongoose.Schema.Types.ObjectId
        // Stores a unique identifier for a user in the "User" collection.
        // ObjectId is MongoDB's default data type for primary keys, ensuring uniqueness and efficient indexing.
        // ref: 'User'
        // Creates a virtual reference to the "User" collection, allowing for seamless navigation between documents.
        
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, {
    timestamps: true
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;