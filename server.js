import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/OrderRoute.js';
import paymentRouter from './routes/paymentRoute.js';


// app config
const app = express();
const port = 4000

// dotenv config
dotenv.config()

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/payments", paymentRouter)

app.get('/', (req, res) => {
    res.send("API is running")
})

app.listen(port, () => {
    // console.log(`Server is running on http://0.0.0.0:${port}`)
})

