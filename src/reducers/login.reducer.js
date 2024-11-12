export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.data;
    default:
      return state;
  }
}