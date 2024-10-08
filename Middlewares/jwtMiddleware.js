const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    try {
        const token = req.headers['authorization'].split(" ")[1]
        if (token) {
            const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse);
            req.payload=jwtResponse.userId
            next()
        } else {
            res.status(406).json("Authorization failed.. Please Login")
        }
    } catch (error) {
        console.log(error);
        res.status(401).json("Authorization failed.. Please Login")
    }
}

module.exports=jwtMiddleware