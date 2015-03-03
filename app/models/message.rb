# == Schema Information
#
# Table name: messages
#
#  id              :integer          not null, primary key
#  created_at      :datetime
#  updated_at      :datetime
#  body            :text
#  conversation_id :integer
#  user_id         :integer
#

class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :user

  validates_presence_of :body, :conversation_id, :user_id
end
