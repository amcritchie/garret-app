class AddStandards < ActiveRecord::Migration
  def change
    create_table :standards do |t|
      t.string :name
      t.text :details

      t.timestamps
    end
  end
end
