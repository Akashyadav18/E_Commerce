import User from "@/model/User";
import Joi from "joi";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const { ConnectDB } = require("@/database/Connection");

ConnectDB();

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    const { name, email, password, role } = await req.json();
    // validate the schema
    const { error } = schema.validate({ name, email, password, role });
    if (error) {
        return NextResponse.json({ success: false, message: error.details[0].message })
    }

    try {
        //check if the user exists or not
        const isUserAlreadyExists = await User.findOne({ email });
        if (isUserAlreadyExists) {
            return NextResponse.json({ success: false, message: "User already exists", status: 400 })
        }
        //hashed password 
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        })

        const savedUser = await newUser.save();
        return NextResponse.json(savedUser, { message: "Account created successfully", status: 201, success: true })


    } catch (error) {
        console.log("error while register user", error);
        return NextResponse.json({ message: "Fail to register user", status: 500, success: false });
    }
}