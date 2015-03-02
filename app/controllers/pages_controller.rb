class PagesController < ApplicationController
  def home
    @user = User.new
    @users = User.all
    @username = User.find_by username: params[:username]
  end
end