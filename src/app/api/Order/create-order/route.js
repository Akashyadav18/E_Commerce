import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/model/Cart";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST (req) {
    try {
        await ConnectDB();

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const data = await req.json();
            const {user} = data;

            const saveNewOrder = await Order.create(data);
            if(saveNewOrder) {
                await Cart.deleteMany({userId: user});
                return NextResponse.json({message: "Product are on the way!", success: true});
            } else {
                return NextResponse.json({message: "Failed to create Order!", success: false});
            }

        } else {
            return NextResponse.json({message: "You are not Authenticated", success: false})
        }
    } catch (error) {
        return NextResponse.json({message: "Something went wrong while createing order", success: false, status: 500})
    }
}