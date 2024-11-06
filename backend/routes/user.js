//  start writing your code from here
const express = require("express");
const jwt = require("jsonwebtoken");
const {User} = require("../db");
const {Auth,SECRET} = require("../middleware/user");

const router = express.Router();

router.post("/signup", async (req,res)=>{
    const {username , password} = req.body;
    try{
        const user = await User.findOne({ username });
        if (user) {
        return res.status(403).json({ message: 'User already exists 🤣' });
        }
        const NewUser = await User.create({
            username : username,
            password : password
        });

        res.json({
            msg : "Signed-up successfully 👌",
            user : NewUser
        });
    }catch(error){
        res.status(500).json({ message: 'Error creating user', error });
    }

})

router.post('/signin' , async (req , res) => {
    const { username , password } = req.body;
    try{
        const user = await User.findOne({username,password});
        if (user){
            const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });

            res.json({
                msg : "Signed-up Successfully 😘",
                token : token
            });
        }
        else{
            res.status(403).json({msg : "Invalid Name or Password ! 😒"});
        }
    }catch(error){
        res.status(500).json({msg : "Error While Signing-in ", error});
    }
});

module.exports = router;