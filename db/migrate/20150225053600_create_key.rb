class CreateKey < ActiveRecord::Migration
  def change
    create_table :keys do |t|
      t.string :name
    end
  end
end
