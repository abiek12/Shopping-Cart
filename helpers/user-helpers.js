const { connectToMongo, getDb } = require("../config/connection");
const collection = require("../config/collections");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
};
