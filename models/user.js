const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(name, email, id, cart) {
    this.name = name;
    this.email = email;
    this.id = new mongodb.ObjectId(id);
    this.cart = cart; // {items: []}
  }

  save() {
    const db = getDb();

    let dbOP;
    if (this.id) {
      dbOP = db.collection("users").updateOne({ _id: this.id }, { $set: this });
    } else {
      dbOP = db.collection("users").insertOne(this);
    }
    return dbOP
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
      .then((result) => {
        console.log("add to cart successfully");
      })
      .catch((err) => console.log(err));
  }

  getCart() {
    return this.cart;
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) }) // Correct usage of ObjectId
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
