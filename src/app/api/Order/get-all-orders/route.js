import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET (req) {
    try {
        await ConnectDB();

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');

            const extractOrders = await Order.find({user: id}).populate('orderItems.product');
            if(extractOrders) {
                return NextResponse.json({data: extractOrders, status: true, status: 200})
            } else {
                return NextResponse.json({message: "Failed to get all Orders", success: false, status:500});
            }

        } else {
            return NextResponse.json({message: "You are not Authenticated", success: false})
        }
    } catch (error) {
        return NextResponse.json({message: "Something went wrong while getting all Orders", success: false, error: error})
    }
}