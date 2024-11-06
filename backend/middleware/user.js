const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET

function Auth(req,res,next){
    const tokenHead = req.headers.authorization;

    if (!tokenHead){
        return res.status(401).json({msg : "Missing Token in Header!"});
    }
    const token = tokenHead.split(' ')[1];
    jwt.verify(token, SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({
                msg : "Forbidden : Not Valid Creaditional 😢"
            })
        }
        req.userId = user.userId;
        next();
    });

};

module.exports = {
    Auth,
    SECRET,
};