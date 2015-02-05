class CreateRestaurantsTable < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.integer :user_id
      t.string :name
      t.string :phone_number
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
    end
  end
end
