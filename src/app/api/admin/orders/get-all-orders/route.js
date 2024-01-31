import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        
        await ConnectDB();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser?.role === "admin") {
            const getAllOrders = await Order.find({}).populate('orderItems.product').populate('user');
            if(getAllOrders) {
                return NextResponse.json({data: getAllOrders, success: true});
            } else {
                return NextResponse.json({message: "Failed to fet the Orders", success: false});
            }
        } else {
            return NextResponse.json({message: "You are not Authenticated", status:500, success: false});
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong while getting all order", success: false, status: 500})
    }
}