const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.get("/", (req, res)=>{
    res.send("Okay")
})


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})