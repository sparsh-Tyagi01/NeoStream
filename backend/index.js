const express = require('express')
const {connectMongoDb} = require('./connections/connect')
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movies')
const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
connectMongoDb(process.env.MONGO_URI)
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.BASE_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}))

app.use(express.json())
app.use('/api/auth', userRoute)
app.use('/api/movies', movieRoute)

io.on('connection', (socket)=>{
    console.log("user connected", socket.id);
    
    socket.on("joinRoom", ({room})=>{
        socket.join(room)
        console.log(`Socket ${socket.id} joined room ${room}`);
        socket.emit("joined", `You joined room ${room}`)
    })

    socket.on("leaveRoom", ({room})=>{
        socket.leave(room)
        console.log(`Socket ${socket.id} left room ${room}`);
    })

    socket.on("sendMessage", ({ room, message, username }) => {
        socket.emit("receiveMessage", {
            message,
            isMe: true,
            username
        })
        socket.to(room).emit("receiveMessage", {
            message,
            isMe: false,
            username
        })
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
        
    })
})

server.listen(process.env.PORT, ()=>console.log(`Server started at PORT: ${process.env.PORT}`))
