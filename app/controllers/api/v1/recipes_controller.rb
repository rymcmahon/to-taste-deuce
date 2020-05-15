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
    puts '********************************'
    puts params["recipe"]
    puts '********************************'
  end
end