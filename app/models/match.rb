# == Schema Information
#
# Table name: matches
#
#  id         :integer          not null, primary key
#  user1_id   :integer
#  user2_id   :integer
#  created_at :datetime
#  updated_at :datetime
#



class Match < ActiveRecord::Base
end
