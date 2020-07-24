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
// 3.18*: Phonebook database step6-2
app.get("/info", (request, response) => {
  Person.find({})
    .then((persons) => {
      const info = `<h3>Phonebook has info for ${
        persons.length
      } people</h3><h3>${Date()}</h3>`;
      response.send(info);
    })
    .catch((error) => next(error));
});

// Query all
// 3.13: Phonebook database, step1
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

// Create
// 3.14: Phonebook database, step2
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing person name or phone number!",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

// Read
// 3.18*: Phonebook database step6-1
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

// Delete
// 3.15: Phonebook database, step3
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).json({ Deleted: result });
    })
    .catch((error) => next(error));
});

// Update
// 3.17*: Phonebook database, step5
app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Unknown Endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else {
    response.status(500).send("internal server error");
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
