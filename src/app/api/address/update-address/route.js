import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/model/Address";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await ConnectDB();
        
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const data = await req.json();
            const { _id, fullName, address, city, country, postalCode } = data;

            const updateAddress = await Address.findOneAndUpdate({
                _id: _id,
            }, { fullName, address, city, country, postalCode }, { new: true });
            if (updateAddress) {
                return NextResponse.json({ message: "Address updated successfully", status: 200, success: true });
            } else {
                return NextResponse.json({ message: "Failed to update address", success: false });
            }
        } else {
            return NextResponse.json({ message: "You are not authenticated", success: false });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong while updating address", success: false });
    }
}