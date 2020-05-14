import React, { useState } from "react";
import PropTypes from "prop-types";

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    cookingTime: "",
    prepTime: "",
    yield: "",
  });
  const handleRecipeChange = (e) =>
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  const emptyIngredient = { name: "" };
  const [ingredients, setIngredients] = useState([{ ...emptyIngredient }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { ...emptyIngredient }]);
  };
  // const [instructions, setInstructions] = useState([{ body: "" }]);
  console.log("recipe: ", recipe);
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={recipe.name}
        onChange={handleRecipeChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={recipe.description}
        onChange={handleRecipeChange}
      />
      <label htmlFor="cookingTime">Cooking Time</label>
      <input
        type="text"
        name="cookingTime"
        id="cookingTime"
        value={recipe.cookingTime}
        onChange={handleRecipeChange}
      />
      <label htmlFor="prepTime">Prep Time</label>
      <input
        type="text"
        name="prepTime"
        id="prepTime"
        value={recipe.prepTime}
        onChange={handleRecipeChange}
      />
      <label htmlFor="yield">Yield</label>
      <input
        type="text"
        name="yield"
        id="yield"
        value={recipe.yield}
        onChange={handleRecipeChange}
      />
      <input type="button" value="Add Ingredient" onClick={addIngredient} />
      {ingredients.map((value, index) => {
        const ingredientId = `name-${index}`;
        return (
          <div key={`ingredient-${index}`}>
            <label htmlFor={ingredientId}>{`Ingredient #${index + 1}`}</label>
            <input
              type="text"
              name={ingredientId}
              data-index={index}
              id={ingredientId}
              className="name"
            />
          </div>
        );
      })}
      <input type="button" value="Add Instruction" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default CreateRecipe;
