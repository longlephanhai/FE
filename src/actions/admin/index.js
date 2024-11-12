export const getUser = (data) => {
  return {
    type: "GET_USER",
    data: data
  }
}
export const getRole = (data) => {
  return {
    type: "GET_ROLE",
    data: data
  }
}
