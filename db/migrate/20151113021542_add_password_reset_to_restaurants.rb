class AddPasswordResetToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :password_reset_token, :string
    add_column :restaurants, :password_reset_sent, :datetime
  end
end
