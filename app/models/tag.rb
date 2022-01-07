class Tag < ApplicationRecord
  validates :name, :count, presence: true
  validates :name, uniqueness: true
  validates :name, format: { without: /\s/,
    message: "cannot contain whitespace" }
  has_and_belongs_to_many :todos
end
