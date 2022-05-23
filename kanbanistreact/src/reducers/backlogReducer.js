import {GET_BACKLOG, GET_PRODUCT_TASK, DELETE_PRODUCT_TASK} from "../actions/types";


const initialState = {
    product_tasks: [],
    product_task: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BACKLOG:
        return{
            ...state,
            product_tasks: action.payload
        };

        case GET_PRODUCT_TASK:
        return{
            ...state,
            product_task: action.payload
        };

        case DELETE_PRODUCT_TASK:
        return{
            ...state,
            product_tasks: state.product_tasks.filter(
                product_task => product_task.productSequence !== action.payload
              )
        };

        default:
        return state;
    }
}