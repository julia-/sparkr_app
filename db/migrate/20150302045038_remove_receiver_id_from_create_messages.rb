class RemoveReceiverIdFromCreateMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :receiver_id, :integer
  end
end
