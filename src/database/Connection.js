import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected: ",connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        console.log("Fail to connect with DB");
    }
}