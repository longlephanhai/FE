export const signIn = (data) => {
  return {
    type: "SIGN_IN",
    data: data
  }
}
export const logout = () => {
  return {
    type: "LOGOUT",
  }
}
export const count = (data) => {
  return {
    type: "COUNT",
    data: data
  }
}
