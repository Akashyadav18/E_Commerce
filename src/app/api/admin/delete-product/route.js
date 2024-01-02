import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import product from "@/model/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {

        await ConnectDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === 'admin') {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) {
                return NextResponse.json({ message: 'Product Id Required', status: 500, success: false })
            }
            const deleteProduct = await product.findByIdAndDelete(id);
            if (deleteProduct) {
                return NextResponse.json({ message: 'Product Delete Successfully', status: 200, success: true });
            } else {
                return NextResponse.json({ message: 'Fail to Delete Product', status: 500, success: false });
            }
        } else {
            return NextResponse.json({ message: "You are not authenticated", status: 500, success: false })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while deleting admin Product", status: 500, success: false })
    }
}