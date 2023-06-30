const asynchandler= require("express-async-handler");
const jwt = require('jsonwebtoken');

const validToken = asynchandler(async(req,res,next)=>{
    let token;
    let authorizeHeader = req.headers.authorization||req.headers.Authorization;
    if ( authorizeHeader&&authorizeHeader.startsWith("Bearer")){
        token = authorizeHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,decode)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorzed");
            }
            //console.log(decode);
            req.user = decode.user;
            next();
        });
        if(!token){
            res.status(400).json({message:"user not found"});
        }
    }
});

module.exports= validToken;