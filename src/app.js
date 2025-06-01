const express=require("express");
const app=express();
app.use("/test",(req,res)=>{
    res.send("hello from test server")
})
app.use((req,res)=>{
    res.send("hello from dashboard")
})

app.listen(3000,()=>{
    console.log("server started")
});