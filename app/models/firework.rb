# == Schema Information
#
# Table name: fireworks
#
#  id            :integer          not null, primary key
#  fireworker_id :integer
#  fireworkee_id :integer
#  status        :boolean
#  created_at    :datetime
#  updated_at    :datetime
#

class Firework < ActiveRecord::Base
end
