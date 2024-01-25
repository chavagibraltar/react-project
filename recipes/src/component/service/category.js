import axios from "axios";
import * as actionType from "../store/action";

export const AddCategory = (data) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/category`,data)
        .then(res => {
            console.log(res.data);
            dispatch({ type: actionType.ADD_CATEGORY, payload: res.data })
        }
        ).catch(err => console.log(err.data));
    }
}

export const SetCategories = () => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/category`)
        .then(res => {
          dispatch({ type: actionType.SET_CATEGORY, payload: res.data })
        }
        ).catch(err => console.log(err.data));
    }
}