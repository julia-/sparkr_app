fireWorks = function () {
  $('.container').on('click', 'a.match-fireworks-btn', function(event) {
    event.preventDefault();
    var match_id = $(this).data('match-id');
    $.ajax('/fireworks', {
      type: 'POST',
      data: {id: match_id}
    }).done(function (result){
      if (result.firework.status === true) {
        $('.got_a_firework').html('You have a firework with '+ result.matched_user.name);
      } else {
        $('.start_a_firework').html('You have started a firework with '+ result.matched_user.name);
      }      
    });
  });
};

$(document).ready(fireWorks);

  Handlebars.registerHelper('dateFormat', function(date, type) {
    var d= new Date(date*1000);
    if (d != null) {
      switch (type)
      {
      case "shortDate":
        d = d.strftime('%d/%m/%Y');
        break;
      case "mediumDate":
        d = d.toUTCString();
        break;
      case "longDate":
        d = d.strftime('%B %d, %Y')
        break;
      case "fullDate":
        d = d.strftime('%A, %B %d, %Y')
        break;
      case "shortTime":
        d = d.strftime('%H:%M %p')
        break;
      case "mediumTime":
        d = d.strftime('%H:%M:%S %p')
        break;
      case "longTime":
        d = d.strftime('%H:%M:%S %p %Z')
        break;
      case "isoDate":
        d = d.strftime('%Y-%m-%d')
        break;
      case "isoTime":
        d = d.strftime('%H:%M:%S')
        break;
      case "isoDateTime":
        d = d.strftime('%Y-%m-%d T%H:%M:%S')
        break;
        case "isoUtcDateTime":
          d = d.strftime('%Y-%m-%d T%H:%M:%S %Z')
          break;
      default:
        d = d.strftime('%d/%m/%Y %H:%M');
      }
    }
    return d;
  });