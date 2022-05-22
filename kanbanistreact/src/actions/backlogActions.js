import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PRODUCT_TASK } from "./types";


export const addProductTask = (backlog_id, product_task, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlog_id}`, product_task);
        history.push(`/productBoard/${backlog_id}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
    
};

export const getBacklog = backlog_id => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getProductTask = (backlog_id, pt_id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PRODUCT_TASK,
            payload: res.data
        })
    } catch (err) {
        history.push("/dashboard");
    }
}

export const updateProductTask = (
    backlog_id,
    pt_id,
    product_task,
    history
  ) => async dispatch => {
    try {
      await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, product_task);
      history.push(`/productBoard/${backlog_id}`);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };