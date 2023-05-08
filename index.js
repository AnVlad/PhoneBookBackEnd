const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] :response-time :data'));

let notes = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const time = new Date();
const info = `<p>Phonebook has info for ${notes.length} people</p>
<p>${time}</p>
`;
const randomId = () => {
  id = Math.random();
  return Math.round(id * 100000);
};

app.get('/info', (request, response) => {
  response.send(info);
});

app.get('/api/persons', (request, response) => {
  response.json(notes);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({
      error: 'content is missing',
    });
  }

  if (notes.find((note) => note.name === request.body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const note = { id: randomId(), ...request.body };
  console.log(note);
  console.log(notes.concat(note));
  response.json(note);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
