class Puzzle < ApplicationRecord
  belongs_to :puzzletype
    
  before_create :slugify
    
  def slugify
      self.slug = name.parameterize
  end

end
