const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },


    description:{
        type:String
    },


    priority:{
        type:String
    },


    status:{
        type:String,
        default:"Pending"
    },


    assignedTo:{
        type:String
    },


    createdBy:{
        type:String
    },


    deadline:{
        type:String
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Task",
    taskSchema
);