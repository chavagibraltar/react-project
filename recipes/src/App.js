import First from './component/pages/first';
import './App.css';
import Header from './component/pages/header';
import HomePage from './component/pages/homePage';
import Login from './component/entrance/login';
import Signin from './component/entrance/signin';
import Entrance from './component/entrance/entrance';
import About from './component/pages/about';
import Recipes from './component/recipes/recipes';
import MyRecipes from './component/recipes/myRecipes';
import AddRecipe from './component/recipes/addRecipe';
import ShoppingList from './component/shoppingList/shoppingList';
import Exit from './component/pages/exit';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <First></First>
      <Header></Header>
      <hr />
      <Routes>
        <Route path="/" element={< Entrance />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={< Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/editRecipe" element={<AddRecipe />} />
        <Route path="/myRecipes" element={<MyRecipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="/exit" element={<Exit />} />

      </Routes>
      {/* </header> */}
    </div>
  );
}

export default App;
