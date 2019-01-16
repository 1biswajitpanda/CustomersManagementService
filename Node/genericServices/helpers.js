//Dependencies
const crypto    = require ("crypto");
const path      = require ('path')
const fs        = require('fs')

//Container
const helpers = {};

//Encrypt the string
helpers.hash = function(str) {
    
    absolutePath = path.join(__dirname,'../config.json');
    configRaw = fs.readFileSync(absolutePath,{encoding:'utf8'});
    config = JSON.parse(configRaw)

    if (typeof(str) === "string" && str.length > 0 ) {
        return hash = crypto.createHmac("sha256",config.secret).update(str).digest("hex");
    } else {
        return false;
    }
};

//Allow Cross Domain Request
helpers.allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ( req.method == 'OPTIONS' ) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

//Export the helpers
module.exports = helpers;
