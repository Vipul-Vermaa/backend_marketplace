import mongoose from "mongoose";
const schema=new mongoose.Schema({    
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy: { 
        type:String,
        required:true, 
    },
    inventoryItem: {
        type: {
            type: String,
            enum: ['image', 'video', 'document', 'pdf'],
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },        
    createdAt:{
        type:Date,
        default:Date.now,
    },    
})

export const Inventory=mongoose.model("Inventory",schema)