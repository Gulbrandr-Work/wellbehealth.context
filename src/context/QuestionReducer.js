export default (state, action) => {
  switch (action.type) {
    case "UPDATE_SOURCE":
      return {
        ...state,
        prevSource: state.source,
        source: state.source[action.payload.source],
      };
    default:
      return state;
  }
};
