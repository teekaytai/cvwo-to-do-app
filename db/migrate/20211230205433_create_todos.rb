class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.text :details
      t.string :category
      t.boolean :is_done, default: false

      t.timestamps
    end
  end
end
