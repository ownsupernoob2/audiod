import { SET_BOOKS, TOGGLE_FAVORITE } from '../actions/types';

import Book from '../../models/book';

const initialState = {
  books: [],
  favoriteBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        books: action.books,
      };

    // case TOGGLE_FAVORITE:
    //   const existingIndex = state.favoriteBooks.findIndex(
    //     (book) => book.id === action.bookId
    //   );
    //   if (existingIndex >= 0) {
    //     const updatedFavBooks = [...state.favoriteBooks];
    //     updatedFavBooks.splice(existingIndex, 1);
    //     return {
    //       ...state,
    //       favoriteBooks: updatedFavBooks,
    //     };
    //   } else {
    //     const bookToAdd = state.books.find((book) => book.id === action.bookId);
    //     return {
    //       ...state,
    //       favoriteBooks: state.favoriteBooks.concat(bookToAdd),
    //     };
    //   }

    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteBooks.findIndex(
        (book) => book.id === action.bookId
      );
      if (existingIndex >= 0) {
        const updatedFavBooks = [...state.favoriteBooks];
        updatedFavBooks.splice(existingIndex, 1);
        return { ...state, favoriteBooks: updatedFavBooks };
      } else {
        const book = state.books.find((book) => book.id === action.bookId);
        return { ...state, favoriteBooks: state.favoriteBooks.concat(book) };
      }

    default:
      return state;
  }
};
