const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
dotenv.config();
const port = process.env.PORT || 8000
const mongodbConnection = require('./Config/conn');
const AppError = require('./Utils/AppError')
const AsyncWrap = require('./Utils/AsyncWrap')
const DonourRoute = require('./Routes/donourRoutes')
const flash = require("connect-flash")
const nodemailer = require('nodemailer');
const session = require('express-session')
const cookieParser = require('cookie-parser')
app.use(flash())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24,
      maxAge: 1000 * 60 * 60 * 24
    }
  }
  
  app.use(session(sessionConfig));

mongodbConnection.dbConnect();

app.use((req, res, next) => {
    res.locals.email = req.flash("email");
    next();
  })
app.use((req, res, next) => {
    res.locals.messages = req.flash("success");
    next();
  })
app.use((req, res, next) => {
    res.locals.messages = req.flash("fail");
    next();
  })

app.get("/", (req, res)=>{
    res.render('index')
})
app.use("/donour", DonourRoute)

app.use((err, req, res, next) => {
    const { message = "Oh no Error!!!", status = 500 } = err;
    res.status(status).send(`${message}`);  
  })
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})