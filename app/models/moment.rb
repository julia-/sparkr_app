# == Schema Information
#
# Table name: moments
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  moment_id  :integer
#  created_at :datetime
#  updated_at :datetime
#

class Moment < ActiveRecord::Base
    belongs_to :user
    has_many :likes 
end
