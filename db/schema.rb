# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_26_164319) do

  create_table "puzzles", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.integer "ratingsum"
    t.integer "numratings"
    t.string "difficulty"
    t.string "data"
    t.string "slug"
    t.integer "Puzzletype_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["Puzzletype_id"], name: "index_puzzles_on_Puzzletype_id"
  end

  create_table "puzzletypes", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "puzzles", "Puzzletypes"
end
