class MomentsController < ApplicationController

  def index
    @moments = Moment.all
  end

  def create
    @current_user = User.find_by :id => session[:user_id]
    @moment = @current_user.moments.create(content: params[:file])
    puts "CREATING MOMENT !!!!!!!!!!!!!!!!!!"
    if @moment.save!
      respond_to do |format|
        format.json{ render :json => @moment }
      end
    end
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

  def destroy
    moment = Moment.find params[:id]
    moment.destroy
    redirect_to root_path
  end

  
  private
  def moment_params
    # binding.pry
    params.require(:moment).permit(:content)
  end

end
