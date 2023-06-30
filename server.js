const express = require("express");
const errHandler = require("./middleware/errorHandler");
const connectDb=require("./config/dbConnection"); 
const dotenv = require("dotenv").config();  

connectDb();
const app = express();
app.use(express.json())
const port = process.env.PORT || 5000;
app.use(errHandler);
app.use("/api/contact",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));


app.listen(port,()=>{
    console.log(`server running on ${port}` );
});
