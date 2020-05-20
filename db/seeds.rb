# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

15.times do
    @recipe = Recipe.create(
        name: Faker::Food.dish,
        description: Faker::Food.description,
        cooking_time: rand(60),
        prep_time: rand(60),
        yield: rand(10)
    )

    @ingredients = []
    6.times do
        @ingredients << {name: "#{Faker::Food.measurement} #{Faker::Food.ingredient}"}
    end
    puts @ingredients
    @ingredients.map{ |ingredient| @recipe.ingredients.create(name: ingredient[:name]) }

    @instructions = []
    6.times do
        @instructions << {body: Faker::Food.description}
    end
    puts @instructions
    @instructions.map{ |instruction| @recipe.instructions.create(body: instruction[:body]) }
end