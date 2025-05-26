import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({

   amount: { 
    type: Number, 
    required: true 
   },
   status: { 
    type: String, 
    enum: ["Success", "Failed"], 
    default: "Success" 
   },
   transactionId: { 
    type: String, 
    required: true 
    },
   date: { 
    type: Date, 
    default: Date.now 
   }
})

const paymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema)
export default paymentModel