module MessagesHelper
  def self_or_other(message)
    message.user == @current_user ? "self" : "other"
  end

  def message_interlocutor(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.receiver
  end

  def message_profile_picker(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.receiver
    # message.user
  end
end
