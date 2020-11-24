module.exports = function(req, res, next){

    //401 unauthorized
    //403 forbidden
    console.log(req.user.isAdmin);
    if(!req.user.isAdmin) return res.status(403).send("Acess Denied")
    next();
}