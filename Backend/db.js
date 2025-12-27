const mongoose=require('mongoose');

const DB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("MongoDB Connected Successfully!");

    }
    catch(err){
        console.log("DB Not Craete Some Error Came From DB",err)
    }
}

module.exports=DB;