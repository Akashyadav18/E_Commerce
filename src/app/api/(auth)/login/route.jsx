import { ConnectDB } from "@/database/Connection";
import User from "@/model/User";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

ConnectDB();

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const dynamic = "force-dynamic"

export async function POST(req) {
    const { email, password } = await req.json();

    const { error } = schema.validate({ email, password });
    if (error) {
        console.log(error);
        return NextResponse.json({ message: error.details[0].message, success: false });
    }

    try {
        // check if email is valid
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return NextResponse.json({ message: "Email is not valid", status: 500, success: false });
        }
        // pass validation
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return NextResponse.json({ message: "Password is not valid", status: 500, success: false });
        }

        //token
        const tokenData = {
            id: checkUser._id,
            email: checkUser?._email,
            role: checkUser?._role
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });

        const finalData = {
            token,
            user: {
                email: checkUser.email,
                name: checkUser.name,
                _id: checkUser._id,
                role: checkUser.role
            }
        }

        return NextResponse.json({finalData, message: "Login successful", status: 200, success: true });

        // response.cookies.set("token", token, {
        //     httpOnly: true
        // });

        // return response;

    } catch (error) {
        console.log("Error while login", error);
        return NextResponse.json({ message: "something went wrong while login", status: 500, success: false });
    }

}