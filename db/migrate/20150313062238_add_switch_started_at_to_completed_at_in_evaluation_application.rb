class AddSwitchStartedAtToCompletedAtInEvaluationApplication < ActiveRecord::Migration
  def change
    rename_column :evaluation_applications, :started_at, :completed_at
  end
end
