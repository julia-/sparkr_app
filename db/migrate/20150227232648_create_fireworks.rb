class CreateFireworks < ActiveRecord::Migration
  def change
    create_table :fireworks do |t|
      t.integer :fireworker_id
      t.integer :fireworkee_id
      t.boolean :status
      t.timestamps
    end
  end
end
