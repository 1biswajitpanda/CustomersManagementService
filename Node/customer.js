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
            db.collection('customer').find({'customerId': id}).toArray((err,docs)=>{
                if (err) {
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
            console.log(results);
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
                    callback(err,null)
                } else {
                    customer.indexCollection(db,(err)=>{
                        if(err) {
                            console.log("Error while Indexing")
                        } else {
                            client.close()
                        }
                    })
                    callback(false,result)
                    client.close();
                }
            })
        }
    })
};


module.exports = customer;