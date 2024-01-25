import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import * as actionType from '../store/action'
import { useEffect } from "react";
import { Input, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SetRecipe } from "../service/recipes";
import { useState } from "react";
import {AddCategory} from '../service/category';
import {EditRecipe} from '../service/recipes';
import {AddRecipeServer} from '../service/recipes';
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    Name: yup.string().required(),
    CategoryId: yup.string().required(),
    Img: yup.string().url().required(),
    Duration: yup.number().required(),
    Difficulty: yup.number().required(),
    Description: yup.string().required(),
    Ingrident: yup.array().of(yup.object({
      Name: yup.string().required(),
      Count: yup.string().required(),
      Type: yup.string().required(),
    })).required(),
    Instructions: yup.array().of(yup.string().required()).required(),
  }).required()

export default function AddRecipe() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.Id);
  const categories = useSelector(state => state.categories);
  const recipes = useSelector(state => state.recipes);
  const [customCategory, setCustomCategory] = useState(false);
  var recipe = useSelector(state => state.recipe) || {};
  const [newRecipeId, setNewRecipeId] = useState(null);
  const navigate = useNavigate();
  const [duration, setDuration] = useState();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      UserId: user,
      Name: recipe?.Name,
      CategoryId: recipe?.CategoryId,
      Img: recipe?.Img,
      Duration: recipe?.Difficulty,
      Difficulty: recipe?.Difficulty,
      Description: recipe?.Description,
      Ingrident: recipe?.Ingrident?.map((field) => ({
        Name: field.Name,
        Count: field.Count,
        Type: field.Type,
      })),
      Instructions: recipe?.Instructions
    },
  })

  const onSubmit = (data) => {
    if (customCategory)
    {
      dispatch(AddCategory({ Name: data.CategoryId }))
      data.CategoryId = categories.length + 1;
    }
    if (!recipe) {
      setNewRecipeId(recipes.length);
      data.Id = newRecipeId;
      console.log(data);
      dispatch(AddRecipeServer(data, navigate))
    } else {
      data.Id = recipe.Id;
      dispatch(EditRecipe(data, navigate))
    }
    recipe = null;
    dispatch({ type: actionType.SET_EDIT_RECIPE, payload: null })
    //console.log(recipe?.Id)
    reset();
  }

  const { fields: ingridentFields, append: appendIngrident } = useFieldArray({
    control,
    name: 'Ingrident',
  });

  const { fields: instructionFields, append: appendInstruction } = useFieldArray({
    control,
    name: 'Instructions',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("Name")} placeholder='Name'></Input>
      <p>{errors.Name?.message}</p>

      <label>Category</label>
      <select {...register("CategoryId")} placeholder='choose category' onChange={(e) => setCustomCategory(e.target.value == categories.length)}>
      <option value={0} disabled={true}>
            "choose category"
          </option>
        {categories.map((category, categoryId) =>
          <option key={categoryId} value={categoryId}>
            {category.Name}
          </option>
        )}
        <option key={categories.length} value={categories.length}>Other</option>
      </select>
      <br />
      {customCategory && (
        <input
          type="text" // You might need to adjust the input type based on your requirements
           placeholder="Enter custom category"
          {...register("CategoryId")}
        />
      )}

      <br />
      {errors.CategoryId && <p>{errors.CategoryId.message}</p>}

      <Input {...register("Img")} placeholder='Img' />
      <p>{errors.Img?.message}</p>
      <br />

      <Input {...register("Duration")} placeholder='Duration' />
      <p>{errors.Duration?.message}</p>

      <label>Difficulty</label>
      <select {...register("Difficulty")} >
        <option value={1}>{"Easy"}</option>
        <option value={2}>{"Medium"}</option>
        <option value={3}>{"Hard"}</option>
      </select>
      <p>{errors.Difficulty?.message}</p>

      <Input {...register("Description")} placeholder='Description' />
      <p>{errors.Email?.message}</p>

      <label>Ingridents:</label>
      <br />
      <div>
        {ingridentFields.map((field, index) => (
          <div key={field.id}>
            <Input {...register(`Ingrident.${index}.Name`)} placeholder='Name' />
            <Input {...register(`Ingrident.${index}.Count`)} placeholder='Count' />
            <Input {...register(`Ingrident.${index}.Type`)} placeholder='Type' />
            <br />
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        type="button"
        onClick={() => {
          appendIngrident({ Name: '', Count: '', Type: '' });
        }}
      >
        appendIngrident
      </Button>
      <br />

      <label>Instructions:</label>
      <br />
      <div>
        {instructionFields.map((field, index) => (
          <div key={field.id}>
            <Input {...register(`Instructions.${index}`)} placeholder='Instruction' />
            <br />
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        type="button"
        onClick={() => {
          appendInstruction('');
          // appendInstruction({ Instruction: '' });
        }}
      >
        appendInstructions
      </Button>
      <br />
      <Button variant="outlined" type="submit">שליחה</Button>
    </form>
  )
}