const user = require('../mongodbAccessServices/user')

const userHandler = {}

userHandler.findOne = (req,res) =>{
    const username = req.params.username;
    user.findOne(username,(err,docs)=>{
        if (err) {
            res.status(500).json({ 'errorMessage': err })
        } else {
            res.status(200).json(docs)
        }
    })    
}

userHandler.insertOne = (req,res) => {
    user.insertOne(req.body,(err,response)=>{
        if (err) {
            res.status(500).json({ 'errorMessage': err })
        } else {
            res.status(200).json(response)
        }
    })
}

module.exports = userHandler