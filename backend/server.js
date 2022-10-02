const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv')

const connectDb = require("./mongodb");
const todoRoute = require("./routes/todoRoutes");

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

connectDb();

app.use("/api", todoRoute);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/build")));
} else {
  app.use("/api", todoRoute);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server Running at port 5000...");
});
