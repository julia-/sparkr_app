class AddSexualPreferenceToUsers < ActiveRecord::Migration
  def change
    add_column :users, :sexual_preference, :string
  end
end
