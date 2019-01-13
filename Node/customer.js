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
                    callback(false,docs)
                    client.close();
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
                    callback(false,docs)
                    client.close();
                }
            })
        }
    })
};

//Index Collection 'customer'
customer.indexCollection = (db,callback)=>{
    db.collection('customer').createIndex(
        { "customerId": -1 },
        null,
        (err, results) => {
            callback(err);
        }
    );
}

//Insert A Customer
customer.insertOne = (docObject, callback) => {
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('customer');
            // Insert a single document
            db.collection('customer').insertOne(docObject, function(err, result) {
                if (err) {
                    client.close();
                    callback(err,null)
                } else {
                    customer.indexCollection(db,(err)=>{
                        if(err) {
                            console.log("Error while Indexing")
                        } else {
                            client.close()
                        }
                    })
                    client.close();
                    callback(false,result)
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