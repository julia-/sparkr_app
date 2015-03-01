module ApplicationHelper
  def nav_menu
    links = "<li>#{ link_to('Home', root_path) }</li>
      <li>#{ link_to('Discover', root_path) }</li>
      <li>#{ link_to('Sparks', root_path) }</li>
      <li>#{ link_to('Messages', root_path) }</li>
      <li>#{ link_to('Edit profile', root_path) }</li>
      <li>#{ link_to('Help', root_path) }</li>"
    if @current_user.present?
      links += "<li>#{ link_to(@current_user.name, user_path(@current_user)) } <i class='fa fa-user'></i></li>
      <li>#{ link_to('Sign Out ', login_path, :method => :delete) }<i class='fa fa-sign-out'></i></li>"
    elsif @current_user.present? && @curent_user.is_admin?
      links += "<li>#{ link_to('All users', root_path) }</li>"
    else 
      "<a href='#{root_path}'><i class='fa fa-bolt'></i></a>"
    end

  end
end

