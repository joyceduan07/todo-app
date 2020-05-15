class AddListToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :list, :string
  end
end
