const jwt       = require('jsonwebtoken');
const fs        = require('fs');
const path      = require('path');

//container
jwtHelper = {}

//Create the JSON Web Token
jwtHelper.generateToken = (req,res)=>{
    
    absolutePath = path.join(__dirname,'../config.json');
    configRaw = fs.readFileSync(absolutePath,{encoding:'utf8'});
    config = JSON.parse(configRaw)

    jwt.sign(req.body.username,config.secret,(err,token)=>{
        if (err) {
            res.set({'status':403,'content-type':'application/json'})
            res.send({ 'errorMessage': err })
        } else {
            res.set({'status':200,'content-type':'application/json'})
            res.json({'token':token})
        }
    })
}

//Verify the Web Token
jwtHelper.verifyToken = (req,res,next)=>{
    
    absolutePath = path.join(__dirname,'../config.json');
    configRaw = fs.readFileSync(absolutePath,{encoding:'utf8'});
    config = JSON.parse(configRaw)

    let rawToken = req.headers['x-access-token'] || req.headers['authorization'];

    if (rawToken) {
        let token = rawToken.split(" ")[1];
        jwt.verify(token,config.secret,(err,decoded)=>{
            if (err) {
                res.status(403).json({ 'errorMessage': err })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(403).json({ 'errorMessage': 'Token Not Provided' })
    }
}

//Export the module
module.exports = jwtHelper;