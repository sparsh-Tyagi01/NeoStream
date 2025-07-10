const express = require('express')
const {connectMongoDb} = require('./connections/connect')
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movies')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')

dotenv.config();
connectMongoDb(process.env.MONGO_URI)
const app = express()

app.use(cors({
    origin: "https://neo-stream-six.vercel.app",
    methods: "POST, DELETE, GET",
    credentials: true
}))

app.use(bodyparser.json())
app.use('/api/auth', userRoute)
app.use('/api/movies', movieRoute)

app.listen(process.env.PORT, ()=>console.log(`Server started at PORT: ${process.env.PORT}`))