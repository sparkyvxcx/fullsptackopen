const express = require("express");
const { response, request } = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

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

// Info
app.get("/info", (request, response) => {
  const info = `
  <h3>Phonebook has info for ${persons.length} people</h3><h3>${Date()}</h3>`;
  response.send(info);
});

// Query all
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// Create
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing person name or phone number!",
    });
  }

  query = persons.find((person) => person.name === body.name);
  if (query) {
    return response.status(400).json({
      error: "name must be unique!",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getRandomId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

// Read
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({
      error: "The Requested Resource does not Exist!",
    });
  }
});

// Delete
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const before = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length === before) {
    response.status(404).json({
      error: "The Requested Resource does not Exist!",
    });
  } else {
    response.status(204).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
