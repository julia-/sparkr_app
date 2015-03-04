class SessionController < ApplicationController
  def new
  end

  def create
    # user = User.find_by :username => params[:username] || User.from_omniauth(env["omniauth.auth"]
    user = User.find_by :username => params[:username]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash[:error] = "Invalid login or password"
      redirect_to root_path
    end
  end
  
  def create_fb
    user = User.from_omniauth(env["omniauth.auth"])
    if user.present?
      session[:user_id] = user.id
      redirect_to root_path   
    else
      flash[:error] = "Invalid login or password"
      redirect_to root_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end

