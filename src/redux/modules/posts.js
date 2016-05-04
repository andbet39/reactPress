const LOAD = 'redux-example/posts/LOAD';
const LOAD_SUCCESS = 'redux-example/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/posts/LOAD_FAIL';
const LOAD_NEXT_PAGE = 'redux-example/posts/LOAD_NEXT_PAGE';

const initialState = {
  loaded: false,
  currentPage: 1
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_PAGE:
      const {currentPage} = state;
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.posts,
        total_pages: action.result.info.total_pages,
        total_posts: action.result.info.total_posts,
        currentPage: parseInt( action.result.info.currentPage, 10),
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(page, globalState) {
  if (page === globalState.currentPage && globalState.posts && globalState.posts.loaded) {
    return true;
  }
  return false;
}

export function loadpage(page) {
  return {
    types: [LOAD_NEXT_PAGE, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/post/loadall?page=' + page)
  };
}

