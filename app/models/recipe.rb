class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :instructions
  mount_uploader :image, ImageUploader
end
