class AddTempPasswordToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :temp_password, :string
  end
end
