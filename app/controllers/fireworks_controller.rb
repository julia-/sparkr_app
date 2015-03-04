class FireworksController < ApplicationController

  def create
    matched_user_id = params[:id].to_i
    matched_user = User.find matched_user_id

    fireworks = Firework.where(:fireworkee_id => @current_user.id, :fireworker_id => matched_user_id)
    fireworks += Firework.where(:fireworkee_id => matched_user_id, :fireworker_id => @current_user.id)

    if fireworks.empty?
      firework = Firework.create :fireworker_id => @current_user.id, :fireworkee_id => matched_user_id, :status => false
    else
      firework = fireworks.first
      # if the person who pressed the button is not the same who "started" the firework,
      # change status to true – the firework is now ... "true" :)
      if firework.fireworker_id != @current_user.id
        firework.status = true
      end
      firework.save
    end
    render :json => {:matched_user => matched_user, :firework => firework }
  end

end
