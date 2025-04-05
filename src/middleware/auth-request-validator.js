const validateUserAuth = (req, res, next)=>{
   if(!req.body.emailId || !req.body.password){
       return res.status(400).json({
           data: {},
           message: "Invalid Credentials",
           success: false,
           err: {},
       });
    }
    next();
}

module.exports = {validateUserAuth};