const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const dbname = "phonebook";
const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.aphza.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const getRandomId = () => {
  const range = 100;
  return Math.floor(Math.random() * Math.floor(range));
};

// Create
const create = (name, number) => {
  const person = new Person({
    id: getRandomId(),
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
    console.log(`added ${name} number ${number} to phonebook`);
  });
};

// Query
const query = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length === 5) {
  const name = process.argv[3];
  const phone = process.argv[4];
  console.log("Pending ...");
  create(name, phone);
} else {
  console.log("Querying ...");
  query();
}
