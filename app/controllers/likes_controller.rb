class LikesController < ApplicationController

  def create
    moment_id = params[:like][:moment_id].to_i
    user_id = params[:like][:user_id]

    already_liked_moment_ids = Like.where(user_id: @current_user.id).map {|l| l.moment_id}
    unless already_liked_moment_ids.include?(moment_id)
      Like.create :user_id => @current_user.id, :moment_id => moment_id
    end
    other_user = User.find user_id

    if @current_user.spark(other_user) && other_user.spark(@current_user)
      Match.create :user1_id => @current_user.id, :user2_id => user_id
      spark = true
    else
      spark = false
    end
    render :json => { :user => other_user, spark: spark }

  end

end
