class Puzzle < ApplicationRecord
  belongs_to :puzzletype
    
  before_create :slugify
  def self.puzzle_of_the_day
    num_puzzles = Puzzle.all.count
    day_of_year = Date.today.yday
    puzzle_number = day_of_year%num_puzzles
    Puzzle.where(id: puzzle_number)

  end
  def slugify
      self.slug = name.parameterize
  end

end
