const Donour = require('../Models/donourModel')
const NewID = require('../Models/NewID')
const nodemailer = require('nodemailer');

const addDonour = async(req, res, next)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const exist = await Donour.findOne({email})

    if (exist) {
        req.flash("fail", "Account already exist");
        res.redirect('donour/forms');
    }
    else {
        let rand = Math.floor(Math.random() * 10000);
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_MAIL,
                    pass: process.env.MAIL_PASS
                }
            });
            var mailOptions = {
                from: process.env.SENDER_MAIL,
                to: `${email}`,
                subject: 'Email Verification',
                text: `Your one Time verification Code to sign up in BloodMate is: ${rand}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            console.log(`OTP sent to ${email}`)
            const existOTP = await NewID.findOne({email})
            if(existOTP){
                const id = existOTP.id;
                await NewID.findByIdAndDelete(id);
            }
            const user = new NewID({
                firstname : fname,
                lastname : lname,
                email : email,
                otp : rand,
                password : password
            })
            await user.save();


            //req.flash("otp", rand);
            // req.flash("fname", fname);
            // req.flash("lname", lname);
            req.flash("email", email);
            //req.flash("password", password);
            res.redirect('/donour/register');
        } catch (error) {
            next(error)
        }
    }
}

module.exports =  addDonour 
