import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'


// const bkash = new bka

const frontend_url = "http://localhost:5173"

// placing user order for frontend
const placeOrder = async (req, res) => {

    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})

        const lineItems = req.body.items.map((item)=>({
            priceData:{
                currency: "BDT",
                productData:{
                    name: item.name
                },
                unitAmount: item.price
            },
            quantity: item.quantity
        }))

        lineItems.push({
            priceData:{
                currency: "BDT",
                productData:{
                    name: "Delivery Charges"
                },
                unitAmount: 100
            },
            quantity: 1
        })


    }
    catch(error){
        console.log(error)
        res.json({success: false, message: 'Error'})

    }


}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "Not Paid"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// user orders for the frontend 
const userOrders = async (req, res) => {

    try{
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    } catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// listing orders for the admin
const listOrders = async (req, res) => {

    try{
        const orders = await orderModel.find({})
        res.json({success: true, data: orders})

    } catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders}

