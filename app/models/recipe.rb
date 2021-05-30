class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :instructions
  has_one_attached :image
end
