import axios from "axios";
import { GET_ERRORS, GET_TASK, GET_TASKS } from "./types";


export const createTask = (task, history) => async dispatch => {
    try {
      const res = await axios.post("http://localhost:8080/api/task", task);
      history.push("/dashboard");
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };


export const getTasks = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/task/all")
  dispatch({
    type: GET_TASKS,
    payload: res.data
  });
};

export const getTask = (id, history) => async dispatch => {
  const res = await axios.get(`http://localhost:8080/api/project/${id}`)
  dispatch({
    type: GET_TASK,
    payload: res.data
  });
}