class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :sender_id
      t.integer :receiver_id

      t.timestamps 
    end

    add_index :conversations, :sender_id
    add_index :conversations, :receiver_id
  end
end
