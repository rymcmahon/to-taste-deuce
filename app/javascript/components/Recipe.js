import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Recipe(props) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/recipes/${props.recipeId}.json`)
      .then(function (response) {
        setRecipe(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <p>{recipe.name}</p>
      <p>{recipe.description}</p>
    </div>
  );
}

export default Recipe;
