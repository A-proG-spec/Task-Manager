import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb is connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error('mongo db connection failed');
        console.error(error.message);
    }
}
export default connectDB

