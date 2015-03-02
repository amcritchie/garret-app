class CreateEvaluations < ActiveRecord::Migration
  def change
    create_table :evaluations do |t|
      t.integer :restaurant_id
      t.string :standards
    end
  end
end
