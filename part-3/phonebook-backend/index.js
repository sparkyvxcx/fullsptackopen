require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./modules/person");
const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(express.json());
// app.use(morgan("tiny"));

morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});

// app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

const requestLogger = function (tokens, req, res) {
  if (req.method !== "POST") {
    return null;
  }
  // console.log(req.body);
  const data = JSON.stringify(req.body);
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    data,
  ].join(" ");
};
app.use(morgan(requestLogger));

let persons = [
  {
    name: "Arto Hellas",
    number: "045-31235234",
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

const getRandomId = () => {
  const range = persons.length * 100;
  let id = 0;

  while (true) {
    id = Math.floor(Math.random() * Math.floor(range));
    person = persons.find((person) => person.id === id);
    if (!person) {
      break;
    } else {
      // debug
      // console.log("hit!", id, range);
      continue;
    }
  }

  return id;
};

// Ping
app.get("/ping", (request, response) => {
  response.send("pong");
});

// Quary info
app.get("/info", (request, response) => {
  const info = `
  <h3>Phonebook has info for ${persons.length} people</h3><h3>${Date()}</h3>`;
  response.send(info);
});

// Query all
// 3.13: Phonebook database, step1
app.get("/api/persons", (request, response) => {
  // response.json(persons);

  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.log("Query:", error);
      response.status(500).send("internal server error");
    });
});

// Create
// 3.14: Phonebook database, step2
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing person name or phone number!",
    });
  }

  // query = persons.find((person) => person.name === body.name);
  // if (query) {
  //   return response.status(400).json({
  //     error: "name must be unique!",
  //   });
  // }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: getRandomId(),
  // };

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // persons = persons.concat(person);

  // response.json(person);
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      console.log("Create:", error);
      response.status(500).send("internal server error");
    });
});

// Read
app.get("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);

  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).json({
  //     error: "The Requested Resource does not Exist!",
  //   });
  // }

  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      console.log(`Read: ${id}`, error);
      response.status(500).send("internal server error");
    });
});

// Delete
app.delete("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // const before = persons.length;
  // persons = persons.filter((person) => person.id !== id);

  // if (persons.length === before) {
  //   response.status(404).json({
  //     error: "The Requested Resource does not Exist!",
  //   });
  // } else {
  //   response.status(204).end();
  // }

  const id = request.params.id;
  Person.findOneAndDelete({ _id: id }, (err, person) => {
    if (err) {
      console.log(err);
    } else {
      response.json(person);
    }
  }).catch((error) => {
    console.log(`Delete: ${id}`, error);
    response.status(500).send("internal server error");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
