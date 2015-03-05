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