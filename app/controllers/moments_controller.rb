class MomentsController < ApplicationController

  def index
    @moments = Moment.all
  end

  def create
    @current_user = User.find_by :id => session[:user_id]
    moment = @current_user.moments.create(moment_params)
    redirect_to root_path
  end

  def new
    @current_user = User.find_by :id => session[:user_id]
    @moment = Moment.new
  end

  def edit
    @moment = Moment.find params[:id]
  end

  def update
    moment = Moment.find params[:id]
    moment.update moment_params
    redirect_to root_path
  end

  private
  def moment_params
    params.require(:moment).permit(:content)
  end

end
