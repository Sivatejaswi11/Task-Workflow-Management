const mongoose=require("mongoose");

require("dotenv").config();



const connectDB = async()=>{


try{


await mongoose.connect(
process.env.DBURL
);


console.log(
"MongoDB Connected Successfully"
);


}
catch(error){


console.log(
"MongoDB Connection Error",
error
);


}


}



module.exports=connectDB;