class Evaluation < ActiveRecord::Base
  belongs_to :restaurant
  belongs_to :standard
  has_many :evaluation_applications
end