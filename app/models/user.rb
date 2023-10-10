class User < ApplicationRecord
  has_many :sessions

  validates :email, presence: true, length: { minimum: 5, maximum: 500 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }

  validates_uniqueness_of :email

  after_validation :hash_password

  private

  def hash_password
    self.password = BCrypt::Password.create(self.password)
  end
end
