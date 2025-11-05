import React, { useEffect, useState } from 'react';
import api from '../api';
import './Styles/books.css';
import './Styles/loan.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await api.get('/books');
        setBooks(res.data);
      } catch (error) {
        console.error('Error loading books:', error);
        setError('Failed to load books.');
      }finally{
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Library Books</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {loading ? 
      (
        <div className='spinner-container'>
            <div className='spinner'></div>
            <p className='text-grey-800 font-bold mt-4'>Loading books...</p>
        </div>
      ) : (

        <div className="card-container">
            {books.map(book => (
             <div className=" card-component" key={book.id}>

                <div className="image">
                  <img src={`/${book.imageUrl}`} alt={book.title} />
                </div>
                <div className="caption">{book.title}</div>
                <div className="details">
                  <div className="publish-year " >{book.publicationYear}</div>
                  <div className="author">{book.author?.country}</div>
                </div>
             </div>
            ))}
     </div>
      )}
    </div>
  );
};

export default BookList;
