class CreateKey < ActiveRecord::Migration
  def change
    create_table :keys do |t|
      t.string :name

      t.timestamps
    end
  end
end
