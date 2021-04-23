const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require('cors');

const checkDuplicateName = require("./utilities/checkDuplicateName")
const PORT = process.env.PORT || 3001;

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json());
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "123-456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const lenOfPhonebook = persons.length;
  const date = new Date().toUTCString();
  res.send(`Phonebook has info for ${lenOfPhonebook} \n${date}`);
});

app.post("/api/persons", (req,res) => {
    const body = req.body;

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "Name or number missing"
        })
    }

    const name = body.name;

    const duplicateName = checkDuplicateName(persons, name)
    
    if(duplicateName.length > 0) {
        return res.status(400).json({
            error: "Name already exists"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Date.now()
    }

    persons = persons.concat(person)
    res.json(persons)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});



app.listen(PORT);
console.log(`Listening on port: ${PORT}`);