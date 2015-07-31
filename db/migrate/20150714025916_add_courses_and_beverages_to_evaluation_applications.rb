class AddCoursesAndBeveragesToEvaluationApplications < ActiveRecord::Migration
  def change
    add_column :evaluation_applications, :crs1, :text
    add_column :evaluation_applications, :crs2, :text
    add_column :evaluation_applications, :crs3, :text
    add_column :evaluation_applications, :bev1, :text
    add_column :evaluation_applications, :bev2, :text
  end
end