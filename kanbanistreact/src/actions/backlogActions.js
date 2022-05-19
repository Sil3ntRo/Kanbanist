import axios from "axios";

export const addProductTask = (backlog_id, product_task, history) => async dispatch => {
    
    await axios.post(`/api/backlog/${backlog_id}`, product_task);
    history.pushState(`/productBoard/${backlog_id}`);
};

