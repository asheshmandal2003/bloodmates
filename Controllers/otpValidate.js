const Donour = require('../Models/donourModel')
const NewID = require('../Models/NewID')

const validateOtp = async (req, res) => {
    const value = req.body.otp;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    try{
        const temp = await NewID.findOne({ email });
        const actualOTP = temp.otp;
        const password = temp.password;
        console.log(`actual OTP: ${actualOTP}, OTP Given: ${value}, user:${fname}`);
        if (actualOTP == value) {
            Donour.create({
                firstname: fname,
                lastname: lname,
                email: email,
                password: password
            })
            await NewID.findByIdAndDelete(temp.id)
            res.send("Donour Registerd")
        }
        else {
            await NewID.findByIdAndDelete(temp.id)
            //throw new AppError("OTP verification Unsuccessful", 400);
            res.send("OTP validation failed")
        }
    }
    catch{
        await NewID.findByIdAndDelete(temp.id)
        res.status(500).send("OTP verification failed, restart registration")
    }
}

module.exports =  validateOtp 