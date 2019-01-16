const customer = require('../mongodbAccessServices/customer')

const customerHandler = {}

customerHandler.findAll = (req,res) =>{
    customer.findAll((err,docs)=>{
        if (err) {
            res.status(500).json({ 'errorMessage': err })
        } else {
            res.status(200).json(docs)
        }
    })
}

customerHandler.findOne = (req,res) => {
    const id = req.params.id;
    customer.findOne(id,(err,docs)=>{
        if (err) {
            res.status(500).json({ 'errorMessage': err })
        } else {
            res.status(200).json(docs)
        }
    })
}

customerHandler.insertOne = (req,res) => {
    customer.insertOne(req.body,(err,response)=>{
        if (err) {
            res.status(500).json({ 'errorMessage': err })
        } else {
            res.status(200).json(response)
        }
    })
}

customerHandler.updateOne = (req,res) => {
        customer.updateOne(req.body,(err,response)=>{
            if (err) {
                res.status(500).json({ 'errorMessage': err })
            } else {
                res.status(200).json(response)
            }
        })
}

customerHandler.deleteOne = (req,res) => {
    const id = req.params.id;
    customer.deleteOne(id,(err,response)=>{
        if (err) {
            res.status(500).json({ 'errorMessage': err })
        } else {
            res.status(200).json(response)
        }
    })
}

module.exports = customerHandler