class List < ApplicationRecord
  belongs_to :user
  before_save { self.title = title.downcase }
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 30 }
end
