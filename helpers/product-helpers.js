const { connectToMongo,getDb } = require("../config/connection");
module.exports = {
  addProduct: (product,callback) => {
    getDb().then((db)=>{
        db.collection('products').insertOne(product).then((data)=>{
          console.log(data.insertedId);
          callback(data.insertedId)
        })
    })
  },
};
  