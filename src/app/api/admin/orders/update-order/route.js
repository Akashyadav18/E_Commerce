import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await ConnectDB();
        const data = await req.json();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser?.role === "admin") {
            const { _id, shippingAddress, orderItems, paymentMethod, isPaid, paidAt, isProcessing } = data;
            const updateOrder = await Order.findOneAndUpdate({ _id: _id },
                {
                    shippingAddress,
                    orderItems,
                    paymentMethod,
                    isPaid,
                    paidAt,
                    isProcessing
                },
                { new: true });
            if (updateOrder) {
                return NextResponse.json({ message: "Order updated successfully", success: true });
            } else {
                return NextResponse.json({ message: "Order not updated", success: false });
            }
        } else {
            return NextResponse.json({ message: "You are not Authenticated", success: false })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong while updating Order", success: false, error: error })
    }
}