class Task < ApplicationRecord
  belongs_to :user
  default_scope -> { order(priority: :desc) }
  validates :user_id, presence: true
  validates :description, presence: true, length: { maximum: 60 }
  validates :list, presence: true
  validates :priority, presence: true, numericality: { less_than_or_equal_to: 5,  greater_than_or_equal_to: 1, only_integer: true }
end
