class PuzzletypeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :description, :ruleset, :rules_description

  has_many :puzzles
end
