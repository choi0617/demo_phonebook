require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3003;

const Person = require("./models/personModel");

morgan.token("body", (req, res) => JSON.stringify(req.body));

//app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());
app.use(cors());

app.get("/api/persons", (req, res) => {
  //res.json(persons);
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) => {
  const lenOfPhonebook = persons.length;
  const date = new Date().toUTCString();
  res.send(`Phonebook has info for ${lenOfPhonebook} \n${date}`);
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  try {
    const newPerson = await person.save();
    //201 means object successfully saved
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      //status 204 no content
      res.status(204).end();
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.message === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  }

  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
