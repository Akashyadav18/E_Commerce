import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/model/Cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const addToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required(),
})

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await ConnectDB();

        const isAuthUser = await AuthUser(req);
        
        if(isAuthUser) {
            const data = await req.json();
            const { userID, productID } = data;
            const { error } = addToCart.validate({ userID, productID });
            if (error) {
                return NextResponse.json({ message: error.details[0].message, status: 500, success: false })
            }

            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID: productID,
                userID: userID,
            })

            if (isCurrentCartItemAlreadyExists?.length > 0) {
                return NextResponse.json({ message: "Product already added in cart", status: 500, success: false })
            }
            const saveProductToCart = await Cart.create(data);
            console.log("saveCart :",saveProductToCart);
            if (saveProductToCart) {
                return NextResponse.json({ message: "Product added successfully", status: 200, success: true });
            } else {
                return NextResponse.json({ message: "Fail to add aProduct to Cart", status: 500, success: false });
            }

        } else {
            return NextResponse.json({ message: "You are not authenticated", status: 500, success: false })
        }

    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Something went Wrong while adding product to cart", status: 500, success: false })
    }
}