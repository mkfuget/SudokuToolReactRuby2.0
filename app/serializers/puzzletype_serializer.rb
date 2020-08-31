class PuzzletypeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :description

  has_many :puzzles
end
