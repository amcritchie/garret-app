class AddDepartmentDescriptionsToEvaluationApplications < ActiveRecord::Migration
  def change
    add_column :evaluation_applications, :department_descriptions, :text
  end
end
