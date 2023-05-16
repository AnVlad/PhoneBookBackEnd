// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

// // console.log(process.argv);

// const password = process.argv[2];

// const url = `mongodb+srv://Vlad:${password}@mongodb.hobozpl.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.set('strictQuery', false);
// mongoose.connect(url);

// const numberSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Number = mongoose.model('Number', numberSchema);

// const number = new Number({
//   name: process.argv[3],
//   number: process.argv[4],
// });

// if (process.argv.length < 5) {
//   Number.find({}).then((result) => {
//     console.log(
//       'phonebook: \n',
//       result.map((person) => `${person.name} ${person.number}`).join('\n'),
//     );
//     mongoose.connection.close();
//   });

//   return;
// }

// number.save().then((result) => {
//   console.log(result);
//   console.log(`added ${result.name} number ${result.number} to phonebook`);
//   mongoose.connection.close();
// });
