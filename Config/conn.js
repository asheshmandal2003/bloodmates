const mongoose = require('mongoose')

const dbConnect = async() =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((e)=>{
        console.log(e);
    })
}

module.exports = {dbConnect} 