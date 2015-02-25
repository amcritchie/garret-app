class Department < ActiveRecord::Base
  has_many :questions
end
