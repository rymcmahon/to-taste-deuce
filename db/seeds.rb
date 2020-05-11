# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

recipe = Recipe.create(
    name: "Italian Meaatballs",
    description: "Classic Italian meatballs",
    cooking_time: 20,
    prep_time: 15,
    yield: 8
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1-lb. 80/20 ground beef"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1/2-lb. ground veal"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1/2-lb. ground pork"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1 tsp garlic powder"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1/2 teaspoon salt"
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Brine chicken for 24 hours"
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Combine all ingredients and mix well."
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Roll into racquet ball sized meatballs."
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Bake at 350 degrees for about 20 minutes."
)