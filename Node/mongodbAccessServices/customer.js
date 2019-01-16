//  
//            {
//                'customerId'  : number,       <--- indexed on customerId
//                'name'        : string,
//                'profession'  : string,
//                'Address'     : string,       
//                'phone'       : number,
//                'image'       : string
//            }

// Below Process has been followed to create the database collection and index.
//          >use customer
//          >db.createCollection('customer')
//          >db.customer.createIndex({customerId:-1},{unique:true})


//TODO : change the corresponding methods to findeOne, findOneAndUpdate and findOneAndDelete

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

//Create the wrapper
customer = {};

//Find All the Customers
customer.findAll = (callback)=>{
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('customer');
            db.collection('customer').find().toArray((err,docs)=>{
                if (err) {
                    client.close();
                    callback(err,null)
                } else {
                    client.close();
                    callback(false,docs)
                }
            })
        }
    })
};

//Find A specific customer
customer.findOne = (id,callback)=>{
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('customer');
            const Id = Number(id);
            db.collection('customer').find({'customerId': Id}).toArray((err,docs)=>{
                if (err) {
                    client.close();
                    callback(err,null)
                } else {
                    client.close();
                    callback(false,docs)
                }
            })
        }
    })
};

// //Index Collection 'customer'
// customer.createIndex = (db,callback)=>{          /* CREATEINDEX NEEDS TO BE CALLED ONCE WHILE CREATING THE DATABASE */
//     db.collection('customer').createIndex(       /* HENCE WE SHOULD NOT CALL CREATE INDEX WITH EACH WRITE */
//         { "customerId": -1 },
//         { unique : true },
//         (err, results) => {
//             callback(err);
//         }
//     );
// }

//Insert A Customer
customer.insertOne = (docObject, callback) => {
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('customer');
            //find the last customer number inserted
            db.collection('customer').find({}).sort({ customerId : -1 }).limit(1).toArray((err,docs)=>{
                if (err) {
                    callback(err,null)
                } else {
                    if (docs.length == 0) {
                        docObject.customerId = parseInt((Math.random()*1000000/1).toString())
                    } else {
                        console.log(docs);
                        docObject.customerId = docs[0].customerId + 1
                    }
                    // Insert a single document
                    db.collection('customer').insertOne(docObject, function(err, response) {
                        if (err) {
                            client.close();
                            callback(err,null)
                        } else {
                            client.close();
                            callback(false,response.ops[0])
                        }
                    })
                }
            })
        }
    })
};

//Update A Customer
customer.updateOne = (docObject, callback) => {
    console.log("inside customer updateOne")
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('customer');
            //Create the query to identify the customer
            const determineCustomerQuery = { customerId : docObject.customerId };
            const newValues = { 
                $set: 
                {   customerId : docObject.customerId,
                    name : docObject.name,
                    profession : docObject.profession,
                    image : docObject.image
                }
            }
            //Update the customer
            db.collection('customer').updateOne(determineCustomerQuery, newValues, function(err, response) {
                if (err) {
                    client.close();
                    callback(err,null)
                } else {
                    client.close();
                    callback(false,response.result);
                }
            })
        }
    })
};

//Delete A Customer
customer.deleteOne = (id, callback) => {
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('customer');
            //Create the query to identify the customer
            const Id = Number(id);
            const determineCustomerQuery = { customerId : Id };
            //Delete the customer
            db.collection('customer').deleteOne(determineCustomerQuery, function(err, response) {
                if (err) {
                    client.close();
                    callback(err,null)
                } else {
                    client.close();
                    callback(false,response.result);
                }
            })
        }
    })
};

module.exports = customer;