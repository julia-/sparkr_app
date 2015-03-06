# == Schema Information
#
# Table name: users
#
#  id                :integer          not null, primary key
#  name              :string
#  username          :string
#  email             :string
#  password_digest   :string
#  dob               :date
#  description       :text
#  gender            :string
#  location          :string
#  profile_pic       :text
#  is_admin          :boolean          default("false")
#  created_at        :datetime
#  updated_at        :datetime
#  provider          :string
#  uid               :string
#  oauth_token       :string
#  oauth_expires_at  :datetime
#  latitude          :float
#  longitude         :float
#  sexual_preference :string
#

class User < ActiveRecord::Base
  mount_uploader :profile_pic, ProfilePicUploader
  
  has_secure_password
  geocoded_by :location
  after_validation :geocode, :if => lambda{ |obj| obj.location_changed? }
  validates :username, :format => { with: /\A[a-zA-Z0-9_.@-]+\Z/ }, :presence => true, :uniqueness => true
  validates :email, :presence => true, :uniqueness => true
  validates :password, :presence => true,
                       :confirmation => true,
                       :length => {:within => 6..30},
                       :on => :create

  has_many :moments
  has_many :likes
  has_many :conversations, :foreign_key => :sender_id
 
  
  # has_many :messages_received, :class_name => 'Message', :foreign_key => 'receiver_id'
  # has_many :messages_sent, :class_name => 'Message', :foreign_key => 'sender_id'

  # Create user account when signing in using Facebook for the first time
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.username = auth.info.email
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

  def age
    (Date.today - dob).to_i / 365
  end

end
