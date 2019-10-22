const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  return mongoose
    .connect(process.env.DB, { useNewUrlParser: "true" })
    .then(db => {
      isConnected = db.connections[0].readyState;
    });
};

module.exports = connectToDatabase;
