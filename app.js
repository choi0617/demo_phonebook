const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware")

const personRouter = require("./controllers/person")

morgan.token("body", (req, res) => JSON.stringify(req.body));

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once("on", () => {
  logger.info("DB connected:");
});

db.on("error", (err) => {
  logger.error("connection error:", err);
});

app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());
app.use(middleware.requestLogger);


// router
app.use("/api/persons", personRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app