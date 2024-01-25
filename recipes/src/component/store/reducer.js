import * as actionType from './action'

const initialState = {
    recipes: [],
    shoppingList:[],
    categories: [],
    isEdit: false,
    recipeId: null,
    recipe: null,
    user: {
        Id: 0,
        Username: "",
        Password: "",
        Name: "",
        Phone: "",
        Email: "",
        Tz: ""
    }
}
function Reducer(state = initialState, action) {
    switch (action.type) {
        //user's actions
        case actionType.SET_USER://להוסיף משתמש
            console.log("set user")
            return {
                ...state,
                user: action.paylaod
            }

        //recipe's actions
        case actionType.SET_RECIPE:// לקבלת כל המתכונים לשנות ללשון רבים בשביל העריכה/הוספה
            return {
                ...state,
                recipes: action.payload
            }
        case actionType.ADD_RECIPE://להוספת מתכון חדש
            {
                const recipes = [...state.recipes];
                recipes.push(action.paylaod);
                return {
                    ...state,
                    recipes
                }
            }
        case actionType.EDIT_RECIPE://לעריכת מתכון קיים
            {
                const recipes = [...state.recipes];
                const index = recipes.findIndex(r => r.Id = action.paylaod.Id);
                recipes[index] = action.paylaod;
                return {
                    ...state,
                    recipes
                }
            }
        case actionType.DELETE_RECIPE://למחיקת מתכון
            {
                const recipes = [...state.recipes];
                recipes = recipes.filter(r => r.Id !== action.paylaod.Id);// action.paylaod//,kuh cakhjv
                return {
                    ...state,
                    recipes
                }
            }

        //IsEdit's actions
        case actionType.SET_EDIT_RECIPE://לקבלת ועריכת הID של המתכון
            {
                console.log("SET_RECIPE Dispatch")
                return {
                    ...state,
                    recipe: action.payload
                }
            }

        //ingrident's actions / shoppingList's actions
        case actionType.SET_INGRIDENT://לקבלת כל המצרכים
        return {
            ...state,
            shoppingList: action.payload
        }
        case actionType.ADD_INGRIDENT://להוספת מצרך 
            {
                const shoppingList = [...state.shoppingList];//1 כוס קמח לבן או תופח = 140 גרם | 1 כף = 10 גרם
                const index = shoppingList.findIndex(g => g.Name === action.payload.Name);// && g.Type === action.payload.Type);//1 כוס קמח לבן או תופח = 140 גרם | 1 כף = 10 גרם
                if (index === -1) {
                    shoppingList.push(action.payload);
                }
                else {
                    if (action.data.Count === 0) {
                        shoppingList.splice(index, 1)
                    }
                    else {
                        shoppingList[index] = action.payload
                    }
                }
                return {
                    ...state,
                    shoppingList
                }
            }
        case actionType.DELETE_INGRIDENT://למחיקת מצרך 
            {
               
                var shoppingList = [...state.shoppingList];
                 shoppingList = shoppingList.filter(g => g.Id === action.payload.Id);//g.Name === action.payload.Name && g.Type === action.payload.Type);
                
                return {
                    ...state,
                    shoppingList
                }
            }

        //category's actions
        case actionType.SET_CATEGORY://לקבלת כל הקטגוריות
            return {
                ...state,
                categories: action.payload
            }
        case actionType.ADD_CATEGORY://להוספת קטגוריה
            {
                const categories = [...state.categories]
                categories.push(action.paylaod);
                return {
                    ...state,
                    categories
                }
            }
        default: return {
            ...state
        }
    }
}
export default Reducer
