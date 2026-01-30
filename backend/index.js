const express = require('express')
const {connectMongoDb} = require('./connections/connect')
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movies')
const cors = require('cors')
const http = require('http');

dotenv.config();
connectMongoDb(process.env.MONGO_URI)
const app = express()
const server = http.createServer(app)
const io = new Server(server)

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
        socket.emit("joined", `You joined ${room}`)
    })

    socket.on("sendMessage", ({ room, message }) => {
        io.to(room).emit("receiveMessage", {
        room,
        user: socket.id,
        message
        })
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
        
    })
})

app.listen(process.env.PORT, ()=>console.log(`Server started at PORT: ${process.env.PORT}`))
