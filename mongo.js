const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/phonebook";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


const db = mongoose.connection

db.once('open', () => {
    console.log(`DB connected: ${url}`);
})

db.on('error', err => {
    console.log('connection error:', err);
})


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: String,
        unique: true,
        required: true
    }
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: 'Jane Doe',
    number: '123-456'
});

// person.save().then(result => {
//     console.log('Person saved!');
//     mongoose.connection.close();
// })

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })