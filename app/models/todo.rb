class Todo < ApplicationRecord
  validates :name, presence: true
  has_and_belongs_to_many :tags
end
