export const roleReducer = (state = false, action) => {
  switch (action.type) {
    case "GET_ROLE":
      return action.data;
    default:
      return state;
  }
}