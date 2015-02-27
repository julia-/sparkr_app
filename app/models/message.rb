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
end
