const TOGGLE = 'redux-example/sidebar/TOGGLE';


const initialState = {
  toggled: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      const {toggled} = state;
      return {
        toggled: toggled ? false : true
      };
    default:
      return state;
  }
}


export function toggle() {
  return {
    type: TOGGLE
  };
}
