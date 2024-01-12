import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/model/Address";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await ConnectDB();

        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({message: "You are not Logged in", success: false});
        }

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const deleteAddress = await Address.findByIdAndDelete(id);
            if(deleteAddress){
                return NextResponse.json({message: "Address deleted successfully", status: 200, success: true});
            } else {
                return NextResponse.json({message: "Failed to delete address", success: false});
            }
        } else {
            return NextResponse.json({message:" You are not authenticated", success: false});
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong while deleting address", success: false});
    }
}