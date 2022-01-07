class CreateJoinTableTodosTags < ActiveRecord::Migration[7.0]
  def change
    create_join_table :todos, :tags do |t|
      # To find all tags a to-do has
      t.index :todo_id
      # To find all to-dos that have a certain tag
      t.index :tag_id
    end
  end
end
