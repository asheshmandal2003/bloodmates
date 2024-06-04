const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT || 8000
const mongodbConnection = require('./Config/conn');
const DonourRoute = require('./Routes/donourRoutes')
const flash = require("connect-flash")
const nodemailer = require('nodemailer');
const session = require('express-session')
const cookieParser = require('cookie-parser')
//app.use(flash())
app.use(express.urlencoded({extended: true}))

mongodbConnection.dbConnect();

app.use("/donour", DonourRoute)
app.get("/", (req, res)=>{
    res.send("Okay")
})

app.use((err, req, res, next) => {
    const { message = "Oh no Error!!!", status = 500 } = err;
    res.status(status).send(`${message}`);  
  })
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})