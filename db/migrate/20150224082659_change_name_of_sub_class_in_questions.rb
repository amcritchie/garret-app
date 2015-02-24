class ChangeNameOfSubClassInQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :key, :string
    rename_column :questions, :sub_class, :department
  end
end
