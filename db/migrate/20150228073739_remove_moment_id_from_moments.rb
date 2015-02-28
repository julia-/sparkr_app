class RemoveMomentIdFromMoments < ActiveRecord::Migration
  def change
    remove_column :moments, :moment_id, :integer
  end
end
