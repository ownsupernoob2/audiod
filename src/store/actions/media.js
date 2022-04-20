import { UPDATE_MEDIA } from './types';



export const updateMedia = (media, callback) => dispatch => {
  
  dispatch({type: UPDATE_MEDIA, media: media});
  if(callback)
    callback();
};
