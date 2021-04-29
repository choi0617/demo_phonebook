const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const url = config.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once("on", () => {
  logger.info("DB connected:", db_url);
});

db.on("error", (err) => {
  logger.error("connection error:", err);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    unique: true,
    required: true,
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
