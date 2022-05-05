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
        ...state,
        books: action.books,
      };

   

    // case TOGGLE_FAVORITE:
    // const exitsIndex = state.favoriteBooks.findIndex((book) => book.id === action.bookId);
    // if(exitsIndex >= 0) {
    //     return { ...state, favoriteBooks: state.favoriteBooks.filter((book) => book.id !== action.bookId) }
    // } else {
    //     const favBook = state.books.find((book) => book.id === action.bookId);
    //     return { ...state, favoriteBooks: state.favoriteBooks.concat(favBook) };
    // }
    
  


    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteBooks.findIndex(
        book  => book.id === action.bookId
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
