const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const donourSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true      
    },
    password:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String
    },
    address:{
        type: String
    }
})

donourSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Donour = mongoose.model("Donour", donourSchema);
