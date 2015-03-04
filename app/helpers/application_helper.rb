module ApplicationHelper
  def nav_menu
    links = 
      "<div class='nav-links-left'><li class='nav-home'>#{ link_to('Sparkr', root_path(:type => 'discover'), :remote => true) }<a href='#{root_path}' class='matches'><i class='fa fa-bolt'></i></a></li>
      
      <li class='nav-matches'>#{ link_to('Matches', root_path(:type => 'matches'), :remote => true) }<a href='#{root_path}'><i class='fa fa-heart'></i></a></li>

      <li class='nav-messages'>#{ link_to('Messages', root_path(:type => 'messages'), :remote => true) }<a href='#{root_path}'><i class='fa fa-envelope'></i></a></li></div>

      <div class='nav-links-right'><li class='nav-edit'>#{ link_to('Edit', root_path(:type => 'edit'), :remote => true) }<a href='#{root_path}'><i class='fa fa-pencil'></i></a></li>

      <li class='nav-help'>#{ link_to('Help', root_path(:type => 'help'), :remote => true) }<a href='#{root_path}'><i class='fa fa-question'></i></a></li>"
    if @current_user.present?
      links += "<li class='nav-profile'>#{ link_to(@current_user.name, root_path(:type => 'profile'), :remote => true) } <i class='fa fa-user'></i></li>
      <li>#{ link_to('Sign Out ', logout_path, :method => :delete) }<i class='fa fa-sign-out'></i></li></div>"
    elsif @current_user.present? && @curent_user.is_admin?
      links += "<li>#{ link_to('All users', root_path) }</li></div>"
    else 
      "<a href='#{root_path}'><i class='fa fa-bolt fa-2x sparkr-logo'></i></a>"
    end
  end
end

