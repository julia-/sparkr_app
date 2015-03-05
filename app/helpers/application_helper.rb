module ApplicationHelper
  def nav_menu
    links = 
      "<div class='nav-links-left'>
        <li class='nav-home'>
          #{ link_to(root_path(:type => 'discover'), title: 'Sparkr', :remote => true) do fa_icon('bolt', text: 'Sparkr ', right: true) end }
        </li>
        
        <li class='nav-matches'>
          #{ link_to(root_path(:type => 'matches'), title: 'Matches', :remote => true) do fa_icon('heart', text: 'Matches ', right: true) end }
        </li>

        <li class='nav-messages'>
          #{ link_to(root_path(:type => 'messages'), title: 'Messages', :remote => true) do fa_icon('envelope', text: 'Messages ', right: true) end }
        </li>
      </div>
      <div class='nav-links-right'>
        <li class='nav-edit'>
          #{ link_to(root_path(:type => 'edit'), title: 'Edit', :remote => true) do fa_icon('pencil', text: 'Edit ', right: true) end }
        </li>
        <li class='nav-help'>
          #{ link_to(root_path(:type => 'help'), title: 'Help', :remote => true) do fa_icon('question', text: 'Help ', right: true) end }
        </li>"
    if @current_user.present?
      links += 
        "

        <li>
          #{ link_to(logout_path, title: 'Sign Out ', :method => :delete) do fa_icon('sign-out', text: 'Sign out ', right: true) end }
        </li>
      </div>"
    elsif @current_user.present? && @curent_user.is_admin?
      links += 
        "<li>#{ link_to('All users', root_path) }</li></div>"
    else 
        "<h1 class='nav-home'>
          #{ link_to(root_path, title: 'Sparkr', :remote => true) do fa_icon('bolt', text: 'Sparkr ', right: true) end }
        </h1>"
    end
  end
end
