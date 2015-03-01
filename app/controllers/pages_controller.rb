class PagesController < ApplicationController
  def home
    @user = User.new
    @username = User.find_by username: params[:username]
  end
end