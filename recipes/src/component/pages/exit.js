import Login from '../entrance/login';
import { useSelector } from "react-redux";
import swal from 'sweetalert';
export default function Exit(){
    const user = useSelector(state => state.user);
    swal(`${user.Name} disconnected!`, "We will be happy to see you again");
    return(<>
    {/* <Login></Login> */}
         <p>By By...</p>
     </>)
}