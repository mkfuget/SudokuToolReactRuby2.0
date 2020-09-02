class PuzzleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :author, :difficulty, :data, :ratingsum, :numratings, :slug, :Puzzletype_id

  belongs_to :Puzzletype
end
