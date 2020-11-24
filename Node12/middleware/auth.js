const config = require("config");
const jwt = require("jsonwebtoken")

//token is sent along with request in headers, check for it and decode
module.exports  = function(req,res,next){

    if(!config.get("requiresAuth")) return next();

    const token = req.header("x-auth-token"); //default name of token in header of http

    if(!token){
        return res.status(401).send("Acess denied. No JWT token")
    }
    try{
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        console.log(req.user._id, "****");
        next();
        }
    catch (ex){
        res.status(400).send("Invalid JWT")

    }

}