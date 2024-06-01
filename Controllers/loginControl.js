const Donour = require('../Models/donourModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const authController = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;    
    
    const user = await Donour.findOne({email});
    if(!user){
        res.clearCookie('Bearer');
        //req.flash("fail","Email or Password mismatched");
        res.send("Email or password incorrect")
    }
    else{
       const valid = await bcrypt.compare(password, user.password);
       if(valid){
        const token = jwt.sign({
            email: email,
            password: password
        },
        process.env.JWT_SECRET,
        { expiresIn: 60*60 });
        res.clearCookie('Bearer');
        res.cookie("Bearer", token,{
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        console.log(token);
        res.send("login successful");
       }
       else{
        //req.flash("fail","Email or Password mismatched");
        res.clearCookie('Bearer');
        res.send("Email or password incorrect")
       }
    }
}

module.exports = authController

