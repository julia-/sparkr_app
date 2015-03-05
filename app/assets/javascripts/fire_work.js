fireWorks = function () {
  $('.container').on('click', 'a.fire_work', function(event) {
    event.preventDefault();
      debugger;
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