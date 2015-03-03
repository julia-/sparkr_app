class RemoveMessageContentFromCreateMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :message_content, :text
  end
end
