class CreateMoments < ActiveRecord::Migration
  def change
    create_table :moments do |t|
        t.integer :user_id
        t.integer :moment_id
        t.timestamps
    end
  end
end

