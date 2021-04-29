export const roomReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL":
      return [...action.payload];
      case "REMOVE_ROOM":
        return [...action.payload];
        case "ADD_ROOM":
            return [...action.payload];
    default:
      return state;
  }
};
