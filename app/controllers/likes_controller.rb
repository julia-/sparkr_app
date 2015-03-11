class LikesController < ApplicationController

  def create
    if params[:like]
      moment_id = params[:like][:moment_id].to_i
      user_id = params[:like][:user_id]
      # find all the moments' id the current user liked
      already_liked_moment_ids = Like.where(user_id: @current_user.id).map {|l| l.moment_id}
      # check if current user liked the moment before,if not, create a like 
      unless already_liked_moment_ids.include?(moment_id)
        Like.create :user_id => @current_user.id, :moment_id => moment_id
      end
      other_user = User.find user_id
      # check if there is a mach between current user and the moment's owner, 
      # if not create one

      @current_user.likes.reload

      if @current_user.spark(other_user) && other_user.spark(@current_user)
        Match.create :user1_id => @current_user.id, :user2_id => user_id
        spark = true
      else
        spark = false
      end
    end
    render :json => { :user => other_user, spark: spark }

  end

end
