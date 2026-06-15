require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


connectDB();


const taskRoutes = require("./controller/taskController");


app.use("/task",taskRoutes);



const PORT = process.env.PORT || 8002;


app.listen(PORT,()=>{

console.log("Task Service running on "+PORT);

});