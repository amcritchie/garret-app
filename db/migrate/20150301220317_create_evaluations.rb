class CreateEvaluations < ActiveRecord::Migration
  def change
    create_table :evaluations do |t|
      t.integer :restaurant_id
      t.integer :standard_id
      t.string :status
      t.string :name

      t.timestamps
    end
  end
end
