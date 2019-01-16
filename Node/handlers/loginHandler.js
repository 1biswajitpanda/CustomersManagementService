const user = require('../mongodbAccessServices/user')

const login = {}

login.verifyUser = (req,res,next) =>{
    let username = req.body.username
    let password = req.body.password
    const docObject = {
        username : username,
        password : password
    }
    
    user.verify(docObject,(err,response)=>{
        if (err) {
            res.status(403).json({ 'errorMessage': err })
        } else {
            next()
        }
    })
}

module.exports = login