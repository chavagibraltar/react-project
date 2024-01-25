import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "../categories/category";
import FilterCategory from '../filters/filterCategory'
import FilterDuration from "../filters/filterDuration";
import FilterDifficulty from "../filters/filterDifficulty";
export default function GetRecipes() {
    const [categoryId, setCategoryId] = useState();
    const [duration, setDuration] = useState();
    const [difficulty, setDifficulty] = useState();
    //const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleCategory = (data) => {
        setCategoryId(data)
    }
    const handleDuration = (data) => {
        setDuration(data)
    }
    const handleDifficulty = (data) => {
        setDifficulty(data);
    }
    const recipes = useSelector(state => state.recipes);

    return <>
        <h1>מתכונים:</h1>
        <Category categoryId={handleCategory} />
        <FilterDuration duration={handleDuration} />
        <FilterDifficulty difficulty={handleDifficulty} />
        <div className='recipes'>
            <FilterCategory categoryId={categoryId} recipes={recipes} duration={duration} difficulty={difficulty} />
        </div>
    </>
}
///////////////////
// {// useEffect(() => {
//     axios.get(`http://localhost:8080/api/recipe`)
//         .then(res => {
//             setRecipes(res.data);
//             dispatch({ type: actionType.SET_RECIPE, payload: res.data })
//         }
//         ).catch(err => console.log(err));
// }, [])
//     Id: 1,
//     Name: "עוגה כושית",
//     UserId: 1,
//     CategoryId: 2,
//     Img: "https://img.mako.co.il/2023/03/27/oga_pereg_choclet_autoOrient_i.jpg",
//     Duration: "50",
//     Difficulty: 1,
//     Description: "עוגה קלה להכנה",
//     Ingrident: [
//         { Name: "בייצים", Count: 5, Type: "-" },
//         { Name: "סוכר", Count: 1.5, Type: "כוסות" },
//         { Name: "קמח", Count: 5, Type: "כפות" }
//     ],
//     Instructions: ["לערבב את כל החומרים יחד", "לאפות על חום בינוני", "לחתוך מיד אחרי האפיה"]
// },