const { connectToMongo, getDb } = require("../config/connection");
const collection = require("../config/collections");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ObjectId } = require("mongodb");

module.exports = {
  doSignup: async (userData) => {
    userData.Password = await bcrypt.hash(userData.Password, saltRounds);
    // Store hash in your password DB.
    return new Promise((resolve, reject) => {
      getDb().then((db) => {
        db.collection(collection.USER_COLLECTION)
          .insertOne(userData)
          .then((data) => {
            resolve(data.insertedId);
          });
      });
    });
  },

  doLogin: (userData) => {
    return new Promise((resolve, reject) => {
      let response = {};
      getDb().then(async (db) => {
        let user = await db
          .collection(collection.USER_COLLECTION)
          .findOne({ Email: userData.Email });
        if (user) {
          bcrypt.compare(userData.Password, user.Password).then((status) => {
            if (status) {
              console.log("Login successfull");
              response.user = user;
              response.status = true;
              resolve(response);
            } else {
              console.log("Login failed, Incorrect Password");
              resolve({ status: false });
            }
          });
        } else {
          console.log("You dont have account in this email, please sign in!");
          resolve({ status: false });
        }
      });
    });
  },

  addToCart: (productId, userId) => {
    let productObj = {
      item: new ObjectId(productId),
      quantity: 1,
    };
    return new Promise(async (resolve, reject) => {
      let db = await getDb();
      let cart = await db.collection(collection.CART_COLLECTION).findOne({
        user: new ObjectId(userId),
      });
      if (cart) {
        let productExist = cart.products.findIndex(
          (product) => product.item == productId
        );
        if (productExist != -1) {
          getDb().then((db) => {
            db.collection(collection.CART_COLLECTION)
              .updateOne(
                { "products.item": new ObjectId(productId) },
                {
                  $inc: { "products.$.quantity": 1 },
                }
              )
              .then(() => {
                resolve();
              });
          });
        } else {
          getDb().then((db) => {
            db.collection(collection.CART_COLLECTION)
              .updateOne(
                { user: new ObjectId(userId) },
                {
                  $push: { products: productObj },
                }
              )
              .then(() => {
                resolve();
              });
          });
        }
      } else {
        getDb().then((db) => {
          db.collection(collection.CART_COLLECTION)
            .insertOne({
              user: new ObjectId(userId),
              products: [productObj],
            })
            .then(() => {
              resolve();
            });
        });
      }
    });
  },
  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      let db = await getDb();
      let cartItems = await db
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: new ObjectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "productDetails",
            },
          },
        ])
        .toArray();
      resolve(cartItems);
    });
  },
  getCartProductCount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let db = await getDb();
      let count = 0;
      let cart = await db.collection(collection.CART_COLLECTION).findOne({
        user: new ObjectId(userId),
      });
      if (cart) {
        count = cart.products.length;
      }
      resolve(count);
    });
  },
};
