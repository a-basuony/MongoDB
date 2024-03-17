const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// This middleware function retrieves a user from the database and attaches it to the req object, making it available to other parts of the application.
app.use((req, res, next) => {
  User.findById("65f5b917e7a166f91a583d0c")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

// ---------------------------------------- Mongodb----------------
//
// 1- connection in util/database.js file using callback function
//
//const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const mongoConnect = (callback) => {
//   MongoClient.connect(
//     "mongodb+srv://ahmedbasuony:u4bpmTIoQBOUcDaY@cluster0.2jgswxg.mongodb.net/"
//   )
//     .then((result) => {
//       console.log("connected");
//       callback(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// module.exports = mongoConnect;
//
//
// 2- in app.js
//
//const mongoConnect = require("./util/database");
//mongoConnect((client) => {
//   console.log(client);
//   app.listen(3000);
// });
//
//
//
// 3- finishing the database connection
//   -by calling db() from client in database.js file
//   1 - let _db;
//   2 -     .then((client) => {
//              console.log("connected");
//                _db = client.db();
//                callback();
//               })
//
//    3 - const getDb = () => {
//             if (_db) {
//               return _db;
//             }
//             throw new Error("NO data base found!  Please connect to the database.");
//           };

//
//4- fetchAll()
//
//       // - id is automatic _id: ObjectId() // to convert to mongo id
//          { _id: new mongodb.ObjectId(prodId) }
//
//
//
//
//
