const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash")

const authMiddleware = (req, res, next) => {
    try {
      //const token = req.cookies.Bearer;
      const token = req.body.Bearer;
      if (!token) {
        //req.flash("fail","you need to login first");
        res.send("Login token not found")
      } else {
        const validate = jwt.verify(token, process.env.JWT_SECRET);
        console.log(validate);
        next();
      }
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = authMiddleware;