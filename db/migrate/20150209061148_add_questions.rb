class AddQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :body
      t.string :standards
      t.string :sub_class
    end
  end
end
