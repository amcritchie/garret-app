class Remove < ActiveRecord::Migration
  def change
    remove_column :evaluation_applications, :bar_hair
    remove_column :evaluation_applications, :host1_hair
    remove_column :evaluation_applications, :host2_hair
    remove_column :evaluation_applications, :man_hair
    remove_column :evaluation_applications, :ser_hair
    rename_column :evaluation_applications, :res_height, :res_name
  end
end
