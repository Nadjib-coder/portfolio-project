const { MongoClient, serverApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const options = {
  serverApi: {
    version: serverApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri, options);
    } catch (error) {
      console.log(error);
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };
