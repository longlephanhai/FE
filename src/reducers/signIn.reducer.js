export const siginInReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return !state;
    case "LOGOUT":
      return !state;
    default:
      return state;
  }
}