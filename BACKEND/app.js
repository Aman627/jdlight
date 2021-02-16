require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const ProductRoutes = require("./Routes/ProductRoutes");
const UsersRoutes = require("./Routes/UsersRoutes");
const AdminUserRoutes = require("./Routes/AdminUserRoutes");
const CarrerRoutes = require("./Routes/CarrerRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const PaymentReciptRoutes = require("./Routes/PaymentReciptRoutes");
const Extra = require("./Routes/ExtraRoutes");
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/uploads", express.static("./uploads"));

app.use("/api/product", ProductRoutes);
app.use("/api/user", UsersRoutes);
app.use("/api/admin", AdminUserRoutes);
app.use("/api/carrer", CarrerRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/recipt", PaymentReciptRoutes);
app.use("/api/extra", Extra);

app.get("/", (req, res, next) => {
  res.json({ success: "1", message: "we are good upto here!!" });
});

app.listen(process.env.APP_PORT);
