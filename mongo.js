const { MongoClient, ServerApiVersion } = require('mongodb');

class MongoStore {
  __collection;
  __client;
  __db;

  constructor() {
    this.__client = new MongoClient('mongodb+srv://aliuspetraska:s60803GyxKSjvxqN@cluster.mlpppdc.mongodb.net/?retryWrites=true&w=majority&appName=cluster', {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    })
  }

  async connect() {
    try {
      await this.__client.connect();

      this.__db = this.__client.db('antaliepte');
      this.__collection = this.__db.collection('events');

      return Promise.resolve(this);
    } catch (err) {
      console.error(err.message);
    }
    return Promise.resolve(undefined);
  }

  async findAll() {
    try {
      const documents = await this.__collection.find({}).toArray();
      return Promise.resolve(documents);
    } catch (err) {
      console.error(err.message);
    }
    return Promise.resolve([]);
  }
}

module.exports = { MongoStore };
