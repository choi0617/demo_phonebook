const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/phonebook";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person;