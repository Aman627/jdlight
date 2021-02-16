const mongoose = require("mongoose");
const connection = () => {
  mongoose
    .connect(
      "mongodb+srv://jdlight23234234:t23453HtCWxb0544vFD535Y1xZ@cluster0.u2hem.mongodb.net/test?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("connectedd");
    })
    .catch(err => {
      console.log("not connected");
    });
};

exports.connection = connection;
