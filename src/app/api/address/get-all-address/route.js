import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/model/Address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await ConnectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({message: "You are not Logged in", success: false});
        }

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const getAllAddresses = await Address.find({userID: id});
            if(getAllAddresses) {
                return NextResponse.json({data: getAllAddresses, success: true})
            } else {
                return NextResponse.json({message: "Fail to get Addressb", success: false});
            }
        } else {
            return NextResponse.json({message: "You are not Authenticated", success: false});
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong while getting address", success: false});
    }
}