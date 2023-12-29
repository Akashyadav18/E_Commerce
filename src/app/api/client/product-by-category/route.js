import { ConnectDB } from "@/database/Connection";
import product from "@/model/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {

        await ConnectDB();

        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const getData = await product.find({ category: id })
        if (getData) {
            return NextResponse.json({ data: getData, status: 200, success: true });
        } else {
            return NextResponse.json({ message: "Product Not Found", status: 404, success: false });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while fetching All Client Product", status: 500, success: false })
    }
}