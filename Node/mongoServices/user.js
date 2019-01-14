//  
//            {
//                'name'      : string,
//                'role'      : string,
//                'username'  : string,       <--- indexed on username          
//                'password'  : string
//            }

// Below Process has been followed to create the database, collection and index.
//          >use user
//          >db.createCollection('user')
//          >db.user.createIndex({username:1},{unique:true})


const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

//Create the wrapper
user = {};

//Find A specific User
user.findOne = (username,callback)=>{
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('user');
            db.collection('user').find({'username': username}).toArray((err,docs)=>{
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

// Index Collection 'user'                              /*Indexing is NOT required as it is done while defining the collection */
// user.indexCollection = (db,callback)=>{
//     db.collection('user').createIndex(
//         { "username": 1 },
//         null,
//         (err, results) => {
//             callback(err);
//         }
//     );
// }

//Insert A User
//The insert command returns an object with the following fields:
//      result      --> Contains the result document from MongoDB
//      ops         --> Contains the documents inserted with added _id fields
//      connection  --> Contains the connection used to perform the insert
user.insertOne = (docObject, callback) => {
    const client = new MongoClient(url);
    client.connect((err,client)=>{
        if (err) {
            callback (err,null)
        } else {
            const db = client.db('user');
            // Insert a single document
            db.collection('user').insertOne(docObject, function(err, response) {
                if (err) {
                    client.close();
                    callback(err,null)
                } else {
                    client.close();
                    callback(false,response.result)
                }
            })
        }
    })
};

module.exports = user;