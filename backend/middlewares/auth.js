const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function verifyToken(req,res,next) {
    const token = req.headers["authorization"]
    if(!token) return res.status(403).send("Token required");
    
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch {
        res.status(401).send("Invalid Token")
    }
}

module.exports = {verifyToken}