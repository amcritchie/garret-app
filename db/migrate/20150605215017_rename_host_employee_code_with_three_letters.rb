class RenameHostEmployeeCodeWithThreeLetters < ActiveRecord::Migration
  def change
    rename_column :evaluation_applications, :host1_valid, :ho1_valid
    rename_column :evaluation_applications, :host1_other, :ho1_other
    rename_column :evaluation_applications, :host1_gender, :ho1_gender
    rename_column :evaluation_applications, :host1_height, :ho1_height
    rename_column :evaluation_applications, :host2_valid, :ho2_valid
    rename_column :evaluation_applications, :host2_other, :ho2_other
    rename_column :evaluation_applications, :host2_gender, :ho2_gender
    rename_column :evaluation_applications, :host2_height, :ho2_height  end
end
