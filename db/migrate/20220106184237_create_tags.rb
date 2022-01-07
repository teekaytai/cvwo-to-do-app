class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :count

      t.timestamps
    end
    # Tags will be searched for by their name as provided by the end user
    add_index :tags, :name
  end
end
