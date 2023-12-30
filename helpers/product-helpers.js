const { connectToMongo,getDb } = require("../config/connection");
module.exports = {
  addProduct: (product,callback) => {
    getDb().then((db)=>{
        db.collection('products').insertOne(product).then((data)=>{
            callback(true)
        })
    })
  },
};
