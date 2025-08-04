
const express = require('express');
const faker = require('faker');
const cors = require('cors');

const app = express();

app.use(cors());

const generateBooks = (seed, page, language, numRecords = 20) => {
  faker.seed(seed + page);
  faker.locale = language;

  const books = [];
  for (let i = 0; i < numRecords; i++) {
    const book = {
      index: page * numRecords + i + 1,
      isbn: faker.datatype.uuid(),
      title: faker.lorem.words(3),
      author: faker.name.findName(),
      publisher: faker.company.companyName(),
    };
    books.push(book);
  }
  return books;
};

app.get('/books', (req, res) => {
  const seed = parseInt(req.query.seed);
  const page = parseInt(req.query.page);
  const language = req.query.language || 'en_US';
  const books = generateBooks(seed, page, language);
  res.json(books);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});