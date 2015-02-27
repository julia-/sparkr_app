class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
        t.string :name
        t.string :username
        t.string :email
        t.string :password_digest
        t.date :dob
        t.text :description 
        t.string :gender
        t.string :location
        t.text :profile_pic
        t.boolean :is_admin, :default => false
        t.timestamps
    end
  end
end


