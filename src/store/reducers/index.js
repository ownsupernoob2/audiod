import { combineReducers } from 'redux';
import books from './books';
import media from './media';
import showBottomTabs from './showBottomTabs';

export default combineReducers({
  books,
  media,
  showBottomTabs
});
