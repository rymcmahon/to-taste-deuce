import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import * as ActiveStorage from "activestorage";
import Input from "@material-ui/core/Input";

// {
//   palette: {
//     primary: indigo,
//     secondary: {
//       main: '#4caf50',
//     },
//   },
// }

addEventListener("direct-upload:initialize", (event) => {
  const { target, detail } = event;
  const { id, file } = detail;
  target.insertAdjacentHTML(
    "beforebegin",
    `
    <div id="direct-upload-${id}" class="direct-upload direct-upload--pending">
      <div id="direct-upload-progress-${id}" class="direct-upload__progress" style="width: 0%"></div>
      <span class="direct-upload__filename"></span>
    </div>
  `
  );
  target.previousElementSibling.querySelector(
    `.direct-upload__filename`
  ).textContent = file.name;
});

addEventListener("direct-upload:start", (event) => {
  const { id } = event.detail;
  const element = document.getElementById(`direct-upload-${id}`);
  element.classList.remove("direct-upload--pending");
});

addEventListener("direct-upload:progress", (event) => {
  const { id, progress } = event.detail;
  const progressElement = document.getElementById(
    `direct-upload-progress-${id}`
  );
  progressElement.style.width = `${progress}%`;
});

addEventListener("direct-upload:error", (event) => {
  event.preventDefault();
  const { id, error } = event.detail;
  const element = document.getElementById(`direct-upload-${id}`);
  element.classList.add("direct-upload--error");
  element.setAttribute("title", error);
});

addEventListener("direct-upload:end", (event) => {
  const { id } = event.detail;
  const element = document.getElementById(`direct-upload-${id}`);
  element.classList.add("direct-upload--complete");
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    cookingTime: "",
    prepTime: "",
    yield: "",
    image: "",
  });

  function handleRecipeChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value.replace("C:\\fakepath\\", ""),
    });
  }

  function handleIngredientChange(e) {
    const inputName = e.target.name;
    const name = inputName.substr(0, 4);
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.index][name] = e.target.value;
    setIngredients(updatedIngredients);
  }

  const emptyIngredient = { name: "" };
  const [ingredients, setIngredients] = useState([{ ...emptyIngredient }]);

  function addIngredient() {
    setIngredients([...ingredients, { ...emptyIngredient }]);
  }

  function handleRemoveInput(inputType, inputIndex) {
    switch (inputType) {
      case "INGREDIENT":
        const ingredientsCopy = [...ingredients];
        ingredientsCopy.splice(inputIndex, 1);
        setIngredients(ingredientsCopy);
      case "INSTRUCTION":
        const instructionsCopy = [...instructions];
        instructionsCopy.splice(inputIndex, 1);
        setInstructions(instructionsCopy);
    }
  }

  function handleInstructionChange(e) {
    const inputName = e.target.name;
    const body = inputName.substr(0, 4);
    const updatedInstructions = [...instructions];
    updatedInstructions[e.target.dataset.index][body] = e.target.value;
    setInstructions(updatedInstructions);
  }

  const emptyInstruction = { body: "" };
  const [instructions, setInstructions] = useState([{ ...emptyInstruction }]);

  function addInstruction() {
    setInstructions([...instructions, { ...emptyInstruction }]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/recipes.json", {
        recipe,
        ingredients,
        instructions,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log("ingredients: ", ingredients);
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="name"
              id="name"
              value={recipe.name}
              onChange={handleRecipeChange}
              label="Name"
              style={{ marginBottom: 8 }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="description"
              id="description"
              value={recipe.description}
              onChange={handleRecipeChange}
              label="Description"
              style={{ marginBottom: 8 }}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              id="image"
              name="image"
              inputProps={{
                "data-direct-upload-url":
                  "https://localhost:3000/rails/active_storage/direct_uploads",
              }}
              // onChange={handleRecipeChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="cookingTime"
              id="cookingTime"
              value={recipe.cookingTime}
              onChange={handleRecipeChange}
              label="Cooking Time (minutes)"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="prepTime"
              id="prepTime"
              value={recipe.prepTime}
              onChange={handleRecipeChange}
              label="Prep Time (minutes)"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="yield"
              id="yield"
              value={recipe.yield}
              onChange={handleRecipeChange}
              label="Yield"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={addIngredient}
              startIcon={<AddCircleOutlineIcon />}
              style={{ marginBottom: 10 }}
            >
              Add Ingredient
            </Button>
            {ingredients.map((value, index) => {
              const ingredientId = `name-${index}`;
              const INPUT = "INGREDIENT";
              return (
                <div key={`ingredient-${index}`}>
                  <TextField
                    type="text"
                    name={ingredientId}
                    inputProps={{ "data-index": `${index}` }}
                    id={ingredientId}
                    value={ingredients[index].name}
                    onChange={handleIngredientChange}
                    variant="outlined"
                    label={`Ingredient #${index + 1}`}
                    style={{ marginBottom: 8, width: "90%" }}
                  />
                  <IconButton
                    color="secondary"
                    aria-label="remove ingredient input"
                    onClick={() => {
                      handleRemoveInput(INPUT, index);
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </div>
              );
            })}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={addInstruction}
              startIcon={<AddCircleOutlineIcon />}
              style={{ marginBottom: 10 }}
            >
              Add Instruction
            </Button>
            {instructions.map((value, index) => {
              const instructionId = `body-${index}`;
              const INPUT = "INSTRUCTION";
              return (
                <div key={`instruction-${index}`}>
                  <TextField
                    type="text"
                    name={instructionId}
                    inputProps={{
                      "data-index": `${index}`,
                    }}
                    multiline
                    rows={2}
                    id={instructionId}
                    value={instructions[index].body}
                    onChange={handleInstructionChange}
                    variant="outlined"
                    label={`Instruction #${index + 1}`}
                    htmlFor={instructionId}
                    style={{ marginBottom: 8, width: "90%" }}
                  />
                  <IconButton
                    color="secondary"
                    aria-label="remove instruction input"
                    onClick={() => {
                      handleRemoveInput(INPUT, index);
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </div>
              );
            })}
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Create Recipe
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default CreateRecipe;
