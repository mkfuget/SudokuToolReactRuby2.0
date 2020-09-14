class CreatePuzzles < ActiveRecord::Migration[6.0]
  def change
    create_table :puzzles do |t|
      t.string :name
      t.string :author
      t.integer :ratingsum
      t.integer :numratings
      t.string :difficulty
      t.string :data
      t.string :slug
      t.belongs_to :puzzletype, null: false, foreign_key: true

      t.timestamps
    end
  end
end
