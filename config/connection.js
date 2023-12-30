const { MongoClient, ServerApiVersion } = require("mongodb");

//connection string
const uri = "mongodb://localhost:27017";
const dbName = "shopping";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

var db;
async function connectToMongo() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    db = client.db(dbName);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch {
    console.error("Connection to MongoDB failed");
  }
}
function getDb() {
  const myPromise = new Promise((resolve, reject) => {
    resolve(db);
  });
  return myPromise;
}
module.exports = { connectToMongo, getDb };
