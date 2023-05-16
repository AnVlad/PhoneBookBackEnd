require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const number = require('./models/number');
const app = express();

app.use(express.json());

app.use(express.static('build'));

// library morgan to show in terminal the information of working server
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] :response-time :data'));
//

app.get('/info', (request, response) => {
  number.find({}).then((data) => {
    response.send(`<p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>
    `);
  });
});

app.get('/persons', (request, response) => {
  number.find({}).then((numbers) => {
    response.json(numbers);
  });
});

app.get('/persons/:id', (request, response, next) => {
  number
    .findById(request.params.id)
    .then((number) => {
      if (number) {
        response.json(number);
      } else {
        response.status(400).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/persons', (request, response, next) => {
  const body = request.body;

  if (!request.body.name) {
    return response.status(400).json({
      error: 'content is missing',
    });
  }

  const newNumber = new number({
    name: body.name,
    number: body.number,
  });

  newNumber
    .save()
    .then((saveNumber) => {
      response.json(saveNumber);
    })
    .catch((error) => next(error));
});

app.put('/persons/:id', (request, response) => {
  console.log(request.body);

  const body = request.body;

  const changedNumber = {
    name: body.name,
    number: body.number,
  };

  number
    .findByIdAndUpdate(request.params.id, changedNumber, { new: true }) // {new:true} returns the new updatedNumber number to the front
    .then((updatedNumber) => {
      response.json(updatedNumber);
    })
    .catch((error) => next(error));
});

app.delete('/persons/:id', (request, response) => {
  number.findByIdAndDelete(request.params.id).then((result) => {
    response.status(204).end();
  });
});

const errorHandler = (error, request, response, next) => {
  // console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
