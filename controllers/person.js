const personRouter = require("express").Router();
const Person = require("../models/personModel");

personRouter.get("/", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

personRouter.get("/:id", (req, res, next) => {
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

personRouter.get("/info", (req, res) => {
  Person.find({}).then((person) => {
    const content = `Phonebook has <b>${
      person.length
    } people</b> as of ${new Date().toUTCString()}`;
    res.send(content);
  });
});

personRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson.toJSON()))
    .catch((err) => next(err));
});

personRouter.put("/:id", (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

personRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      //status 204 no content
      res.status(204).end();
    })
    .catch((err) => next(err));
});

module.exports = personRouter;
