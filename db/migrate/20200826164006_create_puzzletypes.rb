class CreatePuzzletypes < ActiveRecord::Migration[6.0]
  def change
    create_table :puzzletypes do |t|
      t.string :name
      t.string :slug
      t.string :description
      t.string :ruleset
      t.timestamps
    end
  end
end
