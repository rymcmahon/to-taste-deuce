import React, { useState } from "react";
import PropTypes, { func } from "prop-types";
import axios from "axios";

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    cookingTime: "",
    prepTime: "",
    yield: "",
    // ingredients: [],
    // instructions: [],
  });
  const handleRecipeChange = (e) =>
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  const handleIngredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.index][e.target.className] =
      e.target.value;
    setIngredients(updatedIngredients);
  };
  const emptyIngredient = { name: "" };
  const [ingredients, setIngredients] = useState([{ ...emptyIngredient }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { ...emptyIngredient }]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/recipes.json", {
        recipe,
        ingredients,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // const [instructions, setInstructions] = useState([{ body: "" }]);
  console.log("ingredients: ", ingredients);
  return (
    <form onSubmit={handleSubmit}>
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
              value={ingredients[index].name}
              onChange={handleIngredientChange}
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
