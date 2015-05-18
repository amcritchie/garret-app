class Restaurant < ActiveRecord::Base
  has_secure_password
  belongs_to :user
  has_many :evaluations

  # validates_presence_of :name
  # validates_uniqueness_of :email
  # validates :password_digest, length: {minimum: 8}
  # validates :username, length: {maximum: 10, minimum: 4}

end