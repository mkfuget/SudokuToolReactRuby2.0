class Puzzletype < ApplicationRecord
    has_many :puzzles

    before_create :slugify
    
    def slugify
        self.slug = name.parameterize
    end
end
