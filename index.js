const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");

const personRouter = require("./controllers/person")

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());
app.use(cors());

// router
app.use("/api/persons", personRouter)

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => logger.info(`listening on port ${config.PORT}!`));
