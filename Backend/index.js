const express= require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const csrf = require('csurf'); 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
    },
  },
  apis: ['./Routes/*.js'], // path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

require('dotenv').config();

const MONGOOSE_URI = process.env.MONGOOSE_URI;
const FRONTENDPORT = process.env.FRONTENDPORT;

const accessLogStream = fs.createWriteStream('traffic.json', { flags: 'a' });

// Define custom token for IP address
morgan.token('client-ip', (req) => req.ip);

const csrfProtection = csrf({cookie: true});


const loggerMiddleware = morgan((tokens, req, res) => {
    const timestamp = new Date().toISOString();
    const logData = {
        timestamp,
        ip: tokens['client-ip'](req, res),
        method: tokens.method(req, res), 
        path: tokens.url(req, res),
    };
    
    return JSON.stringify(logData) + '\n';
}, { stream: accessLogStream });


const PORT = process.env.PORT ;

const app = express(); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(MONGOOSE_URI)
.then(()=>{console.log("MONGO DB CONNECTED SUCCESSFULLY")})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
})

app.use(express.json());
const server = app.listen(PORT,()=>{
    const logFilePath = 'traffic.json';
    fs.writeFileSync(logFilePath, '');
    console.log("Backend server running at PORT "+PORT);
})

app.use(cors()); 
app.use(cookieParser());
app.use(helmet());
app.use(loggerMiddleware);
app.get('/',(req,res)=>{
    res.send("Hello from backend");
}
)
app.use('/api/user', require('./Routes/User'));
app.use('/api/organisation', require('./Routes/Organization'));
app.use('/api/post', require('./Routes/Post'));
app.use('/api/admin', require('./Routes/Admin'));
app.use('/api/reels', require('./Routes/Reels'));



const io = socket(server,{
    cors:{
        origin:`http://localhost:${FRONTENDPORT}`,
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
        const sendUserSocket  = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})

module.exports = app;