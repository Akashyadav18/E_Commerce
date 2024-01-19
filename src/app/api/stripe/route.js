import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")('sk_test_51Oa9uuSJeryR5AfL0Xr8ckaV3OTFOa5zYovALA7pyyhijwZs1Bv7yHhwpnDflMbDFjtXbG8pBIn2FnzQcRF6tTII00Pgr7jIFT')

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {

        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {

            const res = await req.json();
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: res,
                mode: 'payment',
                success_url: 'http://localhost:3000/checkout' + '?status=success',
                cancel_url: 'http://localhost:3000/checkout' + '?status=cancel',
            });
            return NextResponse.json({ success: true, id: session.id });
        } else {
            return NextResponse.json({message: "You are not Authenticated", success: false});
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong while paying", success: false, status: 500 });
    }
}