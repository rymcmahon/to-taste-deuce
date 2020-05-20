class Api::V1::RecipesController < ApplicationController
  def index
    @recipe = Recipe.all
    render json: @recipe, include: [:ingredients, :instructions]
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe, include: [:ingredients, :instructions]
  end

  def create
    puts params
    @recipe = Recipe.create(
      name: params["recipe"]["name"],
      description: params["recipe"]["description"],
      cooking_time: params["recipe"]["cookingTime"],
      prep_time: params["recipe"]["prepTime"],
      yield: params["recipe"]["yield"]
    )

    @ingredients = params["ingredients"]
    @ingredients.map{ |ingredient| @recipe.ingredients.create(name: ingredient["name"]) }

    @instructions = params["instructions"]
    @instructions.map{ |instruction| @recipe.instructions.create(body: instruction["body"]) }
  end
end