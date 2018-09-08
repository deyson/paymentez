const members = (state = [], action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action;
    default:
      return state;
  }
};

export default members;
