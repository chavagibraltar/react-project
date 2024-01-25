import axios from "axios";
import * as actionType from "../store/action";

export const AddRecipeServer = (data, navigate) => {
    return dispatch => {
        console.log("cvgbhjkl");
        axios.post(`http://localhost:8080/api/recipe`, data)
            .then(res => {
                dispatch({ type: actionType.ADD_RECIPE, payload: res.data })
                navigate('/recipes');
            }
            ).catch(err => console.log(err.data))
    }
}

export const EditRecipe = (data, navigate) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe/edit`, data)
            .then(res => {
                dispatch({ type: actionType.SET_EDIT_RECIPE, payload: res.data })
                navigate('/recipes');
            }
            ).catch(err => console.log(err.data));
    }
}

export const SetRecipe = () => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/recipe`)
            .then(res => {
                dispatch({ type: actionType.SET_RECIPE, payload: res.data })
            }
            ).catch(err => console.log(err.data));
    }
}