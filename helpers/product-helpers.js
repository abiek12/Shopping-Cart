const { connectToMongo,getDb } = require("../config/connection");
const collection=require("../config/collections");
const { ObjectId } = require("mongodb");

module.exports = {
  //function to add product to database
  addProduct: (product,callback) => {
    getDb().then((db)=>{
        db.collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
          callback(data.insertedId)
        })
    })
  },
  // function for retrieve product details from databasse
  getAllProducts:(callback)=>{
      getDb().then( async (db)=>{
        let products=await db.collection(collection.PRODUCT_COLLECTION).find().toArray()
        callback(products)
      })
  },
  deleteProduct:(productId,callback)=>{
    getDb().then(async(db)=>{
      let response= await db.collection(collection.PRODUCT_COLLECTION).deleteOne({_id:new ObjectId(productId)})
      callback(response)
    })
  }
};
