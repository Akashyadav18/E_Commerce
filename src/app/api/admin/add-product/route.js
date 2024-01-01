import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import product from "@/model/Product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
})

export const dynamic = "force-dynamic";

export async function POST (req) {
    try {

        await ConnectDB();

        const user = 'admin';

        const isAuthUser = await AuthUser(req);
        console.log("isAuthUser :", isAuthUser);

        if(user === 'admin5') {
            const extractData = await req.json();
            const {name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop} = extractData;
            const {error} = AddNewProductSchema.validate({name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop});
            if(error) {
                return NextResponse.json({message: error.details[0].message, success: false});
            }

            const newlyCreatedProduct = await product.create(extractData);
            if(newlyCreatedProduct) {
                return NextResponse.json({message: "Product added Successfully", success: true, status: 201});
            } else {
                return NextResponse.json({message: "Fail to add product", success: false, status: 500});
            }

        } else {
            return NextResponse.json({message: "You are not authorized to add Product", status: 500, success: false})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong while Adding Product", status: 500, success: false});
    }
}