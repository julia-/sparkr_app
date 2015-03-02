# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  name             :string
#  username         :string
#  email            :string
#  password_digest  :string
#  dob              :date
#  description      :text
#  gender           :string
#  location         :string
#  profile_pic      :text
#  is_admin         :boolean          default("false")
#  created_at       :datetime
#  updated_at       :datetime
#  provider         :string
#  uid              :string
#  oauth_token      :string
#  oauth_expires_at :datetime
#

class User < ActiveRecord::Base
  # validates :username, :presence => true, :uniqueness => true, :length => { :minimum => 6 }, :on => :create
  # validates :password, length: { in: 6..20 }
  has_secure_password

  has_many :moments
  has_many :likes 
  
  has_many :messages_received, :class_name => 'Message', :foreign_key => 'receiver_id'
  has_many :messages_sent, :class_name => 'Message', :foreign_key => 'sender_id'

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.username = auth.info.email
      # user.dob = auth.info.user_birthday
      user.password = auth.uid
      user.password_confirmation = auth.uid
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  # Spark returns true when a user likes all three of another users moments.
  def spark(other_user)
    user_likes = self.likes.map {|l| l.moment_id}
    other_user_moments = other_user.moments.map {|m| m.id}
    (other_user_moments - user_likes).empty? && other_user_moments.length >= 1
  end

  # Sparks returns a list of users for whom I have liked three of their moments.
  def sparks
    User.all.select {|u| self.spark(u)}
  end

  # Matches returns a list of users for whom I have liked all three of their moments, 
  # and they have liked all three of my moments.
  def matches
    User.all.select {|u| self.spark(u) && u.spark(self)}
  end

end
