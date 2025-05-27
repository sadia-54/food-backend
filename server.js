const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const foodRouter = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/OrderRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');


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
    // console.log(Server is running on http://0.0.0.0:${port})
})

