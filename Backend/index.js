const express= require("express");
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect("mongodb+srv://poojyanth2004:projectfotoflask@cluster0.q3pe61c.mongodb.net/FDFED")
.then(()=>{console.log("MONGO DB CONNECTED SUCCESSFULLY")})
.catch(()=>{console.log("SOME ERROR OCCURED IN CONNECTING MONGODB")})


const app = express();
app.use(express.json());
app.listen(5000,()=>{
    console.log("Backend server running at PORT : 5000");
})
app.use(cors());
app.use('/api/user', require('./Routes/User'));
app.use('/api/post', require('./Routes/Post'));