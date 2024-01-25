import { useSelector } from "react-redux";
import axios from "axios";
import * as actionType from "../store/action";
//sweet-alert
import swal from 'sweetalert';

export const AddIngrident = (name, count, user) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, { Name: name, Count: count, UserId: user.Id })
            .then(res => {
                dispatch({ type: actionType.ADD_INGRIDENT, payload: { Id: res.data.Id, Name: name, Count: res.data.Count, UserId: user.Id } })
                if (count > 0)
                    swal("Good job!", `המוצר ${name} התווסף בהצלחה לעגלת הקניות שלך!`, "success");
                else
                    swal("Good job!", `המוצר ${name} הוסר בהצלחה מעגלת הקניות שלך!`, "success");
            }
            ).catch(err => console.log(err.data));
    }
}

export const SetIngrident = () => {
    const userId = useSelector(state => state.user?.Id);
    return dispatch => {
        axios.get(`http://localhost:8080/api/bay/:${userId}`)
            .then(res => {
                dispatch({ type: actionType.SET_INGRIDENT, payload: res.data })
            }
            ).catch(err => console.log(err.data));
    }
}

export const RemoveIngrident = (user, name, id) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${id}`)
            .then((res) => {
                dispatch({ type: actionType.DELETE_INGRIDENT, payload: { Id: id, Name: name, UserId: user.Id, Count: 0 } })
            }
            ).catch((error) => { console.error(error) })
    }
}



