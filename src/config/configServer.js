import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectToDB = () => {
    try {
        mongoose.connect(process.env.URL_MONGO)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB