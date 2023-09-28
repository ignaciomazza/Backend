import mongoose from "mongoose";
const URI = 'mongodb+srv://juanignaciomazza470:i99kg3OtkqdpNEuy@cluster0.mqbg9qp.mongodb.net/ecommerce?retryWrites=true&w=majority'


const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB