class AddMessageWithEvaluation < ActiveRecord::Migration
  def change
    add_column :evaluations, :message, :text
  end
end
