const express= require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require('socket.io');
const fs = require('fs');

require('dotenv').config();

const MONGOOSE_URI = process.env.MONGOOSE_URI;
const FRONTENDPORT = process.env.FRONTENDPORT;

const loggerMiddleware = (req, res, next) => {
    const { ip, method, originalUrl, baseUrl } = req;
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      ip,
      method,
      path: `${baseUrl}${originalUrl}`
    };

    // Convert the log data to JSON format
    const jsonData = JSON.stringify(logData) + '\n';

    // Log traffic data to a file
    fs.appendFile('traffic.json', jsonData, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    // Continue to the next middleware
    next();
};


mongoose.connect(MONGOOSE_URI)
.then(()=>{console.log("MONGO DB CONNECTED SUCCESSFULLY")})
.catch(()=>{console.log("SOME ERROR OCCURED IN CONNECTING MONGODB")})


const PORT = process.env.PORT ;

const app = express(); 

app.use(express.json());
const server = app.listen(PORT,()=>{
    console.log("Backend server running at PORT "+PORT);
})

app.use(cors()); 
app.use(loggerMiddleware);
app.use('/api/user', require('./Routes/User'));
app.use('/api/post', require('./Routes/Post'));
app.use('/api/admin', require('./Routes/Admin'));



const io = socket(server,{
    cors:{
        origin:`http://localhost:1${FRONTENDPORT}`,
        credentails:true
    }
})



global.onlineUsers = new Map();
const onlineUsers = global.onlineUsers; // Define 'onlineUsers' variable

io.on("connection",(socket)=>{
    global.chatsocket =socket;
    socket.on("addUser",(id)=>{
        onlineUsers.set(id,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket  = onlineUsers.get(data.io);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})