import jwt from "jsonwebtoken"

export const dynamic = "force-dynamic";

const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from your Next.js domain
app.use(cors({ origin: 'https://e-commerce-omega-sepia.vercel.app/' }));

// Other routes and middleware...


const AuthUser = async (req) => {
    const token = req.headers.get('Authentication')?.split(" ")[1];
    if (!token) {
        console.log("No Token");
        return false;
    }        
    console.log(token);

    try {
        const extractAuthUserInfo = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        console.log("extract :", extractAuthUserInfo);

        if (extractAuthUserInfo) return extractAuthUserInfo;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export default AuthUser;