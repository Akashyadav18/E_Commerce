import { ConnectDB } from "@/database/Connection";
import product from "@/model/Product";
import { NextResponse } from "next/server";


ConnectDB();
export const dynamic = "force-dynamic";

export  async function PUT (req) {
    try {
        const extractData = await req.json();
        const {_id, name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl} = extractData;

        const updateProduct = await product.findOneAndUpdate({
            _id: _id,
        }, {
            name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl
        }, {
            new: true
        })
        if(updateProduct ) {
            return NextResponse.json({message: "Product updated successfully", status: 200, success: true});
        } else {
            return NextResponse.json({message: "Failed to update Product", status: 500, success: false});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error while updating admin product", status: 500, success: false});
    }
}
