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
  has_secure_password
  has_many :moments
  has_many :likes 
  
  has_many :messages_received, :class_name => 'Message', :foreign_key => 'receiver_id'
  has_many :messages_sent, :class_name => 'Message', :foreign_key => 'sender_id'


  def spark(other_user)
    user_likes = self.likes.map {|l| l.moment_id}
    other_user_moments = other_user.moments.map {|m| m.id}
   (other_user_moments - user_likes).empty? and not other_user_moments.empty?
  end
  #spark returns true when a user likes all three of another users moments 

  def sparks
    User.all.select {|u| self.spark(u)}
  end
  # sparks returns a list of users for whom I have liked three of their moments

  def matches
    User.all.select {|u| self.spark(u) and u.spark(self)}
  end
  # returns a list of users for whom I have 
  # liked all three of their moments, and they have 
  # liked all three of my moments.

# def matches
#  Match.where(user1 = self.id || user2  = self.id)
#  #returns my own user id where i am either in the first 
# or second column of the matches table
# end
# => []
# Matches returns a list of users for whom I have 
# liked all three of their moments, and they have 
# liked all three of my moments.

end



