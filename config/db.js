import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log(process.env.DB);
        const conn = await mongoose.connect(process.env.DB); 
            console.log(`MongoDB Connected......`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process if the connection fails
    }
};

