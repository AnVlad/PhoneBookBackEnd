const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message);
  });

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 7,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d{2,10}/.test(value);
      },
      message: (props) => `${props.value} is not valid number`,
    },
    required: true,
  },
});

numberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Number', numberSchema);
