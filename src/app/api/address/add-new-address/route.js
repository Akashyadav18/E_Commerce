import { ConnectDB } from "@/database/Connection";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/model/Address";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewAddress = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    userID: Joi.string().required(),
})

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await ConnectDB();

        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const data = await req.json();
            const { fullName, address, city, country, postalCode, userID } = data;

            const { error } = AddNewAddress.validate({ fullName, address, city, country, postalCode, userID });
            if (error) {
                return NextResponse.json({ message: error.details[0].message, success: false, status: 500 })
            }

            const newlyAddedAddress = await Address.create(data);
            if (newlyAddedAddress) {
                return NextResponse.json({ message: "Address added successfully", success: true, status: 200 })
            } else {
                return NextResponse.json({ message: "Failed to add address", success: false, status: 500 });
            }

        } else {
            return NextResponse.json({ message: "You are not authenticated", status: 500, success: false });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong while creating address", status: 500, success: false });
    }
}