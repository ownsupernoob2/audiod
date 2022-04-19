import { SET_BOOKS } from '../actions/types';


import Book from '../../models/book';

const initialState = {
  books: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        books: action.books
      };
  
      default:
        return state;  
  }
 
};










