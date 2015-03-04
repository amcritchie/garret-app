class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :account
      t.string :phone_number
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :first_name
      t.string :last_name
      t.boolean :admin


      t.timestamps
    end
  end
end
