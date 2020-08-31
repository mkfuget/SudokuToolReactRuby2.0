class Puzzle < ApplicationRecord
  belongs_to :Puzzletype
    
  before_create :slugify
    
  def slugify
      self.slug = name.parameterize
  end

end
