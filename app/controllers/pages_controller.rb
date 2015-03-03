class PagesController < ApplicationController
  def home
    @user = User.new
    @users = User.all
    @username = User.find_by username: params[:username]
  end
  def messaging_index
    @users = User.all
  end
end

