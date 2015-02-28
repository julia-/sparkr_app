# == Schema Information
#
# Table name: messages
#
#  id              :integer          not null, primary key
#  sender_id       :integer
#  receiver_id     :integer
#  message_content :text
#  read            :boolean
#  created_at      :datetime
#  updated_at      :datetime
#

class Message < ActiveRecord::Base
  belongs_to :sender, :class_name => 'User'
  belongs_to :receiver, :class_name => 'User'
end
