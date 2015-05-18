class AddAdminToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :admin, :boolean
  end
end
