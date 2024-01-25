import { useEffect } from "react";
import { SetRecipe } from "../service/recipes";
import { SetCategories } from '../service/category';
import { SetIngrident } from '../service/ingrident';
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user?.Id);
  useEffect(() => {
    dispatch(SetRecipe());
    dispatch(SetCategories());
    // dispatch(SetIngrident());

  }, []);
  return <>
    Welcome to the recipe site 
  </>
}