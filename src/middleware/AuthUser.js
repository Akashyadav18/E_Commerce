

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
    const token = req.headers.get('Authentication');
    console.log(token);
}

export default AuthUser;