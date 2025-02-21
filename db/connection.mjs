import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const db= process.env.mongoDBURI;
function ConnectMongoDB(){
try {
    mongoose.connect(db);
    console.log("Database MongoDB connected");
    
} catch (error) {
    console.error('Error connecting database');
}
}
export default ConnectMongoDB;


