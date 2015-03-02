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

  mount_uploader :profile_pic, ProfilePicUploader

  has_secure_password

  has_many :moments
  has_many :likes 
  
  has_many :messages_received, :class_name => 'Message', :foreign_key => 'receiver_id'
  has_many :messages_sent, :class_name => 'Message', :foreign_key => 'sender_id'

  # Spark returns true when a user likes all three of another users moments.
  def spark(other_user)
    user_likes = self.likes.map {|l| l.moment_id}
    other_user_moments = other_user.moments.map { |m| m.id }
    # To check if current user lided other user's three moments.
    common_element = user_likes & other_user_moments
    common_element.length == 3
  end

  # Sparks returns a list of users for whom I have liked three of their moments.
  def sparks
    User.all.select {|u| self.spark(u)}
  end

  # Matches returns a list of users for whom I have liked all three of their moments, 
  # and they have liked all three of my moments.
  def matches
    # binding.pry
    User.all.select {|u| self.spark(u) && u.spark(self)}
  end

end