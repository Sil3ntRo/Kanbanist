import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import errorReducer from "./errorReducer";
import taskReducer from "./taskReducer";
import securityReducer from "./securityReducer";


export default combineReducers ({
    errors:errorReducer,
    task: taskReducer,
    backlog: backlogReducer,
    security: securityReducer
});