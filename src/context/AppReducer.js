export default (state, action) => {
  switch (action.type) {
    case "HOME_RESET":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_PATH":
      return {
        ...state,
        prevPath: state.path,
        path: action.payload,
      };
    case "UPDATE_CRUMBS":
      console.log(state.prevBc);
      return {
        ...state,
        prevBc: [...state.prevBc, state.breadcrumbs],
        breadcrumbs: action.payload,
      };
    case "HANDLE_BACK":
      return {
        ...state,
        prevBc: action.payload,
        breadcrumbs: state.prevBc[state.prevBc.length - 1],
      };
    case "SCREEN_TOGGLE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_BREADCRUMB_NAME":
      return {
        ...state,
        bCrumbName: action.payload,
      };
    case "SET_PATH_NAME":
      return {
        ...state,
        pathName: action.payload,
      };
    case "SET_VAR_DATA":
      return {
        ...state,
        isVarData: true,
        varData: { ...action.payload },
      };
    case "RESET_VAR_DATA":
      return {
        ...state,
        isVarData: false,
        varData: {},
      };
    default:
      return state;
  }
};
