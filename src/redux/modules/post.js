const LOAD = 'redux-example/post/LOAD';
const LOAD_SUCCESS = 'redux-example/post/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/post/LOAD_FAIL';
const SET_SECTIONS = 'redux-example/post/SET_SECTION';

const initialState = {
  loaded: false,
  loadedslug: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result[0],
        loadedslug: action.result[0].slug,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        loadedslug: '',
        data: null,
        error: action.error
      };
    case SET_SECTIONS:
      return {
        ...state,
        post_sections: action.data
      };
    default:
      return state;
  }
}

export function isLoaded(globalState, slug) {
  if ( globalState.post.loadedslug === slug ) {
    return true;
  }
  return false;
}

export function load(slug) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/post/load?slug=' + slug)
  };
}

export function setSections(sectionsArray) {
  return {
    type: SET_SECTIONS,
    data: sectionsArray
  };
}

