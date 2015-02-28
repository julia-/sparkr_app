# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  username        :string
#  email           :string
#  password_digest :string
#  dob             :date
#  description     :text
#  gender          :string
#  location        :string
#  profile_pic     :text
#  is_admin        :boolean          default("false")
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
    has_many :moments
    has_many :likes 
    
    has_many :messages_received, :class_name => 'Message', :foreign_key => 'receiver_id'
    has_many :messages_sent, :class_name => 'Message', :foreign_key => 'sender_id'
end
