const Donour = require('../Models/donourModel')

const viewDonour = async(req, res)=>{
    const donours = await Donour.find();
    res.send(donours);
}

module.exports = viewDonour