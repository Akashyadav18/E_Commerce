import jwt from "jsonwebtoken"

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
    const token = req.headers.get('Authentication')?.split(" ")[1];
    if (!token) return false;
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