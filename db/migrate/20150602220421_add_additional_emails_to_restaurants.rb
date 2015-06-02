class AddAdditionalEmailsToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :additional_emails, :text
  end
end
