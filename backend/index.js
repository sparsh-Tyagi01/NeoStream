const express = require('express')
const {connectMongoDb} = require('./connections/connect')
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movies')
const cors = require('cors')
const path = require('path')

dotenv.config();
connectMongoDb(process.env.MONGO_URI)
const app = express()

app.use(cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}))

app.use(express.json())
app.use('/api/auth', userRoute)
app.use('/api/movies', movieRoute)

app.listen(process.env.PORT, ()=>console.log(`Server started at PORT: ${process.env.PORT}`))
