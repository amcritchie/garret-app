class User < ActiveRecord::Base
  has_secure_password
  has_many :restaurants

  validates_presence_of :email, :password_digest
  validates_uniqueness_of :email
  validates :password_digest, length: {minimum: 8}
  # validates :username, length: {maximum: 10, minimum: 4}

end
