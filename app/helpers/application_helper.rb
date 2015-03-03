module ApplicationHelper
  def nav_menu
    links = 
      "<div class='nav-links-left'><li>#{ link_to('Sparkr', root_path) }<a href='#{root_path}'><i class='fa fa-bolt'></i></a></li>
      
      <li>#{ link_to('Matches', root_path) }<a href='#{root_path}'><i class='fa fa-heart'></i></a></li>

      <li>#{ link_to('Messages', root_path) }<a href='#{root_path}'><i class='fa fa-envelope'></i></a></li></div>

      <div class='nav-links-right'><li>#{ link_to('Edit', root_path) }<a href='#{root_path}'><i class='fa fa-pencil'></i></a></li>

      <li>#{ link_to('Help', root_path) }<a href='#{root_path}'><i class='fa fa-question'></i></a></li>"
    if @current_user.present?
      links += "<li>#{ link_to(@current_user.name, user_path(@current_user)) } <i class='fa fa-user'></i></li>
      <li>#{ link_to('Sign Out ', logout_path, :method => :delete) }<i class='fa fa-sign-out'></i></li></div>"
    elsif @current_user.present? && @curent_user.is_admin?
      links += "<li>#{ link_to('All users', root_path) }</li></div>"
    else 
      "<a href='#{root_path}'><i class='fa fa-bolt'></i></a>"
    end
  end
end

