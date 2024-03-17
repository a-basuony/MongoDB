const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://ahmedbasuony:u4bpmTIoQBOUcDaY@cluster0.2jgswxg.mongodb.net/"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("NO data base found!  Please connect to the database.");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// module.exports = mongoConnect;
