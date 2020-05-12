import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Recipe() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/recipes/`${id}`.json");
  }, []);
  return <div></div>;
}

export default Recipe;
