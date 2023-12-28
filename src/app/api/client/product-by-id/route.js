import { ConnectDB } from "@/database/Connection";
import product from "@/model/Product";
import { NextResponse } from "next/server";

ConnectDB();
export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        const {searchParams} = new URL(req.url);
        const productId = searchParams.get('id');
        if(!productId) {
            return NextResponse.json({message: "Product Id is required", status: 400, success: false});
        }
        const getData = await product.find({_id: productId});
        if(getData && getData.length) {
            return NextResponse.json({data: getData[0], status: 200, success: true});
        } else {
            return NextResponse.json({message: "Product Not Found!", status: 400, success: false});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error while fetching client product by Id", status: 500, success: false});
    }
}