import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/model/Cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await ConnectDB();
        const isAuthUser = await AuthUser(req)
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) {
                return NextResponse.json({ message: "Cart Item ID is required", success: false, status: 404 });
            }
            const deleteCartItem = await Cart.findByIdAndDelete(id);
            if (deleteCartItem) {
                return NextResponse.json({ message: "Cart Item deleted", success: true, status: 200 });
            } else {
                return NextResponse.json({ message: "Fail to delete", success: false, status: 404 });
            }
        } else {
            return NextResponse.json({ message: "You are not authenticated", status: 500, success: false })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong while deleting product", success: false, status: 500 });
    }
}