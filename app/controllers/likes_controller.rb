class LikesController < ApplicationController

def create
  Like.create :user_id => @current_user.id, :moment_id => params[:like][:moment_id]
  other_user = User.find params[:like][:user_id]
  result = {
    :spark => false,
    :user => other_user
  }
  if @current_user.spark(other_user) && other_user.spark(@current_user)
    Match.create :user1_id => @current_user.id, :user2_id => params[:like][:user_id]
    result[:spark] = true
  end
  render :json => result
end


end
