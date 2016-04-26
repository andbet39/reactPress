const LOAD = 'redux-example/post/LOAD';
const LOAD_SUCCESS = 'redux-example/post/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/post/LOAD_FAIL';

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
  console.log(slug);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/post/load?slug=' + slug)
  };
}
