export const countReducer = (state = false, action) => {
	switch (action.type) {
		case "COUNT":
			return action.data;
		default:
			return state;
	}
}