const express = require("express");
const app = express();
const customer = require("./mongoServices/customer");
const user = require("./mongoServices/user");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.listen(9999,()=>{
    console.log(`Time : ${Date.now()}listening on port 9999 \n.............`)
});

app.get("/api/customer",(req,res)=>{
    customer.findAll((err,docs)=>{
        if (err) {
            res.end(`Error : ${err}`)
        } else {
            res.json(docs)
        }
    })
})

app.get('/api/customer/:id',(req,res)=>{
    const id = req.params.id;
    customer.findOne(id,(err,docs)=>{
        if (err) {
            res.end(`Error : ${err}`)
        } else {
            res.json(docs)
        }
    })
})

app.post("/api/customer",(req,res)=>{
    let rawDocObject = '';
    req.on("data",(chunk)=>{
        rawDocObject += chunk;
    })
    req.on("end",()=>{
        docObject = JSON.parse(rawDocObject);
        customer.insertOne(docObject,(err,response)=>{
            if (err) {
                res.send(err)
            } else {
                res.send(response)
            }
        })
    })
})

app.put('/api/customer',(req,res)=>{
    let rawDocObject = '';
    req.on("data",(chunk)=>{
        rawDocObject += chunk;
    })
    req.on("end",()=>{
        docObject = JSON.parse(rawDocObject);
        customer.updateOne(docObject,(err,response)=>{
            if (err) {
                res.end(`Error : ${err}`)
            } else {
                res.send(response)
            }
        })
    })
})

app.delete('/api/customer/:id', (req,res)=>{
    const id = req.params.id;
    customer.deleteOne(id,(err,response)=>{
        if (err) {
            res.end(`Error : ${err}`)
        } else {
            res.send(response)
        }
    })
})

app.get('/api/user/:username',(req,res)=>{
    const username = req.params.username;
    user.findOne(username,(err,docs)=>{
        if (err) {
            res.end(`Error : ${err}`)
        } else {
            res.json(docs)
        }
    })
})

app.get('/api/verifyuser',(req,res)=>{
    //TODO : Change the authorization logic
    console.log('Verified the user successfully')
    res.json({"status": 1 })
})

app.post("/api/user",(req,res)=>{
    let rawDocObject = '';
    req.on("data",(chunk)=>{
        rawDocObject += chunk;
    })
    req.on("end",()=>{
        docObject = JSON.parse(rawDocObject);
        user.insertOne(docObject,(err,response)=>{
            if (err) {
                res.send(err)
            } else {
                res.send(response)
            }
        })
    })
})

app.get('*',(req,res)=>{
    res.end("Invalid Url")
})
