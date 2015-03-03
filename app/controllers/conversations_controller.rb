class ConversationsController < ApplicationController
  
  layout false

  def create
    if Conversation.between(params[:sender_id],params[:receiver_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:receiver_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end

    render json: { conversation_id: @conversation.id }
  end

  def show
    @conversation = Conversation.find(params[:id])
    @receiver = interlocutor(@conversation)
    @messages = @conversation.messages
    @message = Message.new
  end

  private
  def conversation_params
    params.permit(:sender_id, :receiver_id)
  end

  def interlocutor(conversation)
    @current_user == conversation.receiver ? conversation.sender : conversation.receiver
  end
end

