import Book from '../../models/book';
import { SET_BOOKS } from './types';
import { TOGGLE_FAVORITE } from './types';

export const fetchBook = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://audiodproject-default-rtdb.firebaseio.com/books.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedBooks = [];

      for (const key in resData) {
        loadedBooks.push(
          new Book(
            key,
            resData[key].categoryIds,
            resData[key].title,
            resData[key].cover,
            resData[key].description,
            resData[key].audios,
            resData[key].Runtime,
            resData[key].author
          )
        );
      }
      dispatch({
        type: SET_BOOKS,
        books: loadedBooks,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE, 
    bookId: id
  };
};
