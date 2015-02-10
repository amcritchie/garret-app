class Restaurant < ActiveRecord::Base
  belongs_to :user
  # has_secure_password
  #
  # validates_presence_of :name
  # validates_uniqueness_of :email
  # validates :password_digest, length: {minimum: 8}
  # validates :username, length: {maximum: 10, minimum: 4}

end