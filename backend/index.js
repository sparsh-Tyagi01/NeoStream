const express = require('express');
const { connectMongoDb } = require('./connections/connect');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movies');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { connectRedis } = require("./utils/cache")
const compression = require("compression")
const { createAdapter } = require("@socket.io/redis-adapter")
const { createClient } = require("redis")


dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not defined");
  process.exit(1);
}

connectMongoDb(process.env.MONGO_URI);
connectRedis()

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

if (process.env.REDIS_URL) {
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    console.log('Socket.io Redis adapter connected');
  }).catch((err) => {
    console.log('Socket.io Redis adapter failed:', err.message);
  });
}

app.use(compression())
app.use(cors({
  origin: process.env.BASE_URL || "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', userRoute);
app.use('/api/movies', movieRoute);

io.on('connection', (socket) => {
  console.log("user connected", socket.id);

  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    socket.emit("joined", `You joined room ${room}`);
  });

  socket.on("leaveRoom", ({ room }) => {
    socket.leave(room);
  });

  socket.on("sendMessage", ({ room, message, username }) => {
    socket.emit("receiveMessage", { message, isMe: true, username });
    socket.to(room).emit("receiveMessage", { message, isMe: false, username });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
