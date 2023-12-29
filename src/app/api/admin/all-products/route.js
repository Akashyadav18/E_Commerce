import product from "@/model/Product";
import { NextResponse } from "next/server";

const { ConnectDB } = require("@/database/Connection");

export const dynamic = "force-dynamic";

export async function GET() {
    try {

        await ConnectDB();

        const user = "admin";
        if(user === "admin") {
            const extractAllProducts = await product.find({});
            if(extractAllProducts) {
                return NextResponse.json({data: extractAllProducts, status: 200, success: true});
            } else {
                return NextResponse.json({message: "Product not found", status: 404, success: false});
            }
        } else{
            return NextResponse.json({message: "You are not authenticated!", status: 501, success: false})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong while getting all Products", status: 501, success: false})
    }
}