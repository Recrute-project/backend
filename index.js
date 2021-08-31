const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    var whitelist = ["http://localhost:3000"];

    var corsOptions = {
      origin: whitelist,
      exposedHeaders: ["Set-Cookie"],
      credentials: true,
    };
    app.use(cors(corsOptions));

    // for cors request with creds
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Credentials", true);

      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    });

    //bodyparser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //mongo
    const db = process.env.MONGO_URI;

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo");
    //routes

    app.get("/", (req, res) => {
      res.send({ message: "Sudohacks API" });
    });
    app.use("/auth", require("./routes/auth"));
    app.use("/api", require("./routes/api"));
    app.use("/company", require("./routes/company"))
    app.use("/competition", require("./routes/competition"));
    app.use("/offers", require("./routes/offers"));

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
})();
