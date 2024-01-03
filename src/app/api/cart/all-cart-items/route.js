import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/model/Cart";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await ConnectDB();

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');
            if(!id) {
                return NextResponse.json({message: "Please Login ", status: 500, success: false});
            }
            const extractAllCartItems = await Cart.find({userID: id}).populate('userID').populate('productID');
            if(extractAllCartItems) {
                return NextResponse.json({data: extractAllCartItems, success: true});
            } else {
                return NextResponse.json({message: "No Cart Item found", status: 404, success: false});
            }
        } else {
            return NextResponse.json({message: "You are not authorized", status: 401, success: false});
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong while getting all cart items.", status: 500, success: false});
    }
}