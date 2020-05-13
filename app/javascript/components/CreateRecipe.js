import React, { useState } from "react";
import PropTypes from "prop-types";

function CreateRecipe() {
  const [inputs, setInputs] = useState({});

  function handleSubmit() {}
  function handleChange() {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }
  console.log(inputs);
  return (
    <div>
      <h1>Create Recipe</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Cooking Time:
          <input
            type="text"
            name="cooking_time"
            value={inputs.cooking_time}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Prep Time:
          <input
            type="text"
            name="prep_time"
            value={inputs.prep_time}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Yield:
          <input
            type="text"
            name="yield"
            value={inputs.yield}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateRecipe;
