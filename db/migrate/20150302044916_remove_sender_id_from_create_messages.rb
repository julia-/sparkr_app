class RemoveSenderIdFromCreateMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :sender_id, :integer
  end
end
