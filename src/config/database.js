const mongoose=require("mongoose");
const connectDB=async()=>{
await mongoose.connect("mongodb+srv://saikola524:YlvLAanali3quIyH@devtinder.bffaxli.mongodb.net/devTinder");
}
module.exports=connectDB


