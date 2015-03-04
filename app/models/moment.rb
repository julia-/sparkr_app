# == Schema Information
#
# Table name: moments
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#  content    :text
#

class Moment < ActiveRecord::Base

    mount_uploader :content, MomentUploader

    belongs_to :user
    has_many :likes 

    default_scope { order('id DESC') }

    def likers
      self.likes.map { |l| l.user }
    end
    
end
