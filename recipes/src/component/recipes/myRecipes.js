import { useSelector } from "react-redux";
import FilterCategory from "../filters/filterCategory";

export default function MyRecipes() {

    const recipes = useSelector(state => state.recipes);
    const userId = useSelector(state => state.user?.Id);
    return <>
        <h2>המתכונים שלי:</h2>
        <div className="recipes">
            <FilterCategory recipes={recipes} userId={userId} />
        </div>
    </>
}