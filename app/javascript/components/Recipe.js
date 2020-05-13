import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Recipe(props) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/recipes/${props.recipeId}.json`)
      .then(function (response) {
        setRecipe(response.data);
        setIngredients(response.data.ingredients);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
}

Recipe.propTypes = {
  recipeId: PropTypes.string,
};

export default Recipe;
