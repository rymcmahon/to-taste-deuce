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
    @recipe = Recipe.create(
      name: params["recipe"]["name"],
      description: params["recipe"]["description"],
      cooking_time: params["recipe"]["cookingTime"],
      prep_time: params["recipe"]["prepTime"],
      yield: params["recipe"]["yield"]
    )

    @ingredients = params["ingredients"]
    # @ingredients.each do |ingredient|
    #   @recipe.ingredients.create(name: ingredient["name"])
    # end
    @ingredients.map{ |ingredient| @recipe.ingredients.create(name: ingredient["name"]) }
  end
end