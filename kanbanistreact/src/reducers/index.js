import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import errorReducer from "./errorReducer";
import taskReducer from "./taskReducer";

export default combineReducers ({
    errors:errorReducer,
    task: taskReducer,
    backlog: backlogReducer
});