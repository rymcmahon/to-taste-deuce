# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

recipe = Recipe.create(
    name: "Roast Chicken",
    description: "Classic roast chicken that fills the belly and the soul.",
    cooking_time: 75,
    prep_time: 1440,
    yield: 4
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "3.5 to 4-lb. whole chicken"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1 lemon"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "5 sprigs fresh thyme"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1 teaspoon salt"
)

Ingredient.create(
    recipe_id: recipe.id,
    name: "1/2 teaspoon pepper"
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Brine chicken for 24 hours"
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Stuff chicken with lemon and thyme"
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Roast at 450 degrees for 20 minutes."
)

Instruction.create(
    recipe_id: recipe.id,
    body: "Roast at 375 degrees for about 1 hour."
)