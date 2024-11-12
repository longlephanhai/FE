import { combineReducers } from "redux"
import { loginReducer } from "./login.reducer";
import { roleReducer } from "./role.reducer";
import { siginInReducer } from "./signIn.reducer";
import { countReducer } from "./count.reducer";

export const allReducers = combineReducers({
    loginReducer,
    roleReducer,
    siginInReducer,
    countReducer
});