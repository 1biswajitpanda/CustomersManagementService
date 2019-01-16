const express           = require("express");
const app               = express();
const bodyParser        = require('body-parser');

const helpers           = require('./genericServices/helpers')
const jwt               = require('./genericServices/jwt')
const loginHandler      = require('./handlers/loginHandler')
const userHandler       = require('./handlers/userHandler')
const customerHandler   = require('./handlers/customerHandler')

app.listen(9999,()=>{
    console.log(`Time : ${Date.now()}listening on port 9999 \n.............`)
});

app.use(helpers.allowCrossDomain);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/api/user", userHandler.insertOne)

app.post('/login', loginHandler.verifyUser, jwt.generateToken);

app.use('/api/*', jwt.verifyToken)

app.get("/api/customer", customerHandler.findAll)

app.get('/api/customer/:id', customerHandler.findOne)

app.post("/api/customer", customerHandler.insertOne)

app.put('/api/customer', customerHandler.updateOne)

app.delete('/api/customer/:id', customerHandler.deleteOne)

app.get('/api/user/:username', userHandler.findOne)

app.get('*',(req,res)=>{                /*    <------ This needs to be at the end */
    res.end("Invalid Url")              /*    because the first match will trigger the corresponding handler */
})