class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :description
      t.integer :cooking_time
      t.integer :prep_time
      t.integer :yield

      t.timestamps
    end
  end
end
