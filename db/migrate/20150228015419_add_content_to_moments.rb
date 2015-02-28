class AddContentToMoments < ActiveRecord::Migration
  def change
    add_column :moments, :content, :text
  end
end
