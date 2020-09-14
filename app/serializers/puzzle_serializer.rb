class PuzzleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :author, :difficulty, :data, :ratingsum, :numratings, :slug, :puzzletype_id

  belongs_to :puzzletype
end
