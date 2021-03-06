class CreateEvaluationApplication < ActiveRecord::Migration
  def change
    create_table :evaluation_applications do |t|
      t.integer :evaluation_id
      t.integer :user_id
      t.string :status
      t.text :score
      t.timestamp :accepted_at
      t.timestamp :started_at

      t.timestamps
    end
  end
end
