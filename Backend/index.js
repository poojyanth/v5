const express= require("express");
const mongoose = require("mongoose");
const cors = require('cors');

require('dotenv').config();

mongoose.connect("mongodb+srv://poojyanth2004:projectfotoflask@cluster0.q3pe61c.mongodb.net/FDFED")
.then(()=>{console.log("MONGO DB CONNECTED SUCCESSFULLY")})
.catch(()=>{console.log("SOME ERROR OCCURED IN CONNECTING MONGODB")})


const PORT = process.env.PORT ;

const app = express(); 
app.use(express.json());
app.listen(PORT,()=>{
    console.log("Backend server running at PORT "+PORT);
})
app.use(cors()); 
app.use('/api/user', require('./Routes/User'));
app.use('/api/post', require('./Routes/Post'));