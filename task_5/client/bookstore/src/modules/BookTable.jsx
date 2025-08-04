import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const BookTable = ({ settings }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchBooks(0);
    setPage(1);
  }, [settings]);

  const fetchBooks = async (newPage) => {
    const response = await axios.get('https://faker-book-gen.onrender.com/books', {
      params: { seed: settings.seed, page: newPage, language: settings.language }
    });
    if (newPage === 0) {
      setBooks(response.data);
    } else {
      setBooks((prevBooks) => [...prevBooks, ...response.data]);
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      fetchBooks(page);
      setPage(page + 1);
    }
  };

  return (
    <div style={{ height: '400px', overflow: 'auto' }} onScroll={handleScroll}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.index}>
              <td>{book.index}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;