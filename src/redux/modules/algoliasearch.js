import algoliasearch from 'algoliasearch';

const SEARCH = 'redux-example/search/SEARCH';
const SEARCH_SUCCESS = 'redux-example/search/SEARCH_SUCCESS';
const SEARCH_FAIL = 'redux-example/search/SEARCH_FAIL';
const SEARCH_CLEAR = 'redux-example/search/SEARCH_CLEAR';

const initialState = {
  loaded: false,
  searching: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searching: true
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searching: false,
        loaded: true,
        results: action.result.hits,
        error: null
      };
    case SEARCH_CLEAR:
      return {
        ...state,
        searching: false,
        loaded: false,
        results: null,
        error: null
      };
    case SEARCH_FAIL:
      return {
        ...state,
        searching: false,
        loaded: false,
        results: null,
        error: action.error
      };
    default:
      return state;
  }
}


export function searchPost(searchString) {
  const client = algoliasearch('KACYOPHXSU', '910a87e1b934e1dccb44b29757ee49ed');
  const index = client.initIndex('wordpress_post');
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    promise: () => index.search(searchString)
  };
}

export function clearSearch() {
  return {
    type: SEARCH_CLEAR
  };
}
