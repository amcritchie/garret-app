class RemoveHairFromReservationist < ActiveRecord::Migration
  def change
    remove_column :evaluation_applications, :res_hair
  end
end
