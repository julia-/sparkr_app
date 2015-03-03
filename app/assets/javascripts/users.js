var sparkrApp = {

  userIndex: 0,
  momentIndex: 0,

  loadUsers: function() {
   $.getJSON('/users').done(function(result) {
      sparkrApp.users = result; 
      sparkrApp.renderUsers();
  });
 },

  renderUsers: function() {
    $('#users').empty();
    for (var i = 0; i < sparkrApp.users.length; i++) {
      var user = sparkrApp.users[i];
      var li = sparkrApp.usersHTML(user);
      $('#users').append(li);
    };
  },

  showUser: function() {
    $.getJSON('/users/:id').success(function(user){
      $('#current_user').empty();
      var li = sparkrApp.currentUserHTML(user);
      $('#current_user').append(li);
      sparkrApp.current_user_moments = user.moments;    
      sparkrApp.momentHTML = Handlebars.compile( $('#momentTemplate').html() );
      sparkrApp.renderCurrentUserMoments();
    });
  },

  renderCurrentUserMoments: function() { 
    $('#current_user_moments').empty();
    for (var i = 0; i < sparkrApp.current_user_moments.length; i++) {
    var moment = sparkrApp.current_user_moments[i];
    var li = sparkrApp.momentHTML(moment);  
    $('#current_user_moments').append(li);
    };
  },

  loadMatches: function() {
   $.getJSON('/users/2/match').done(function(result) {
      sparkrApp.matches = result;
      sparkrApp.renderMatches(); 
  });
 },

  renderMatches: function() {
    $('#matches').empty();
    for (var i = 0; i < sparkrApp.matches.length; i++) {
      var match = sparkrApp.matches[i];
      var li = sparkrApp.matchesHTML(match);
      $('#matches').append(li);
    };
  }, 

  showMoments: function(userIndex, momentIndex) {  
    $.getJSON('/users/momentshow').done(function(users) {
      if (userIndex < users.length) {
        var userOnShow = users[userIndex].name;
        sparkrApp.user_id = users[userIndex].id;
        var momentOnShow = users[userIndex].moments[momentIndex].content.large.url
        sparkrApp.moment_id = users[userIndex].moments[momentIndex].id;
        $('#user_moment').empty();
        var $user = $('<p/>').text = userOnShow;
        var $moment = $('<img/>').attr('src', momentOnShow);
        $('#user_moment').append($user);
        $('#user_moment').append($moment);
      } else {
        alert("You have seen all the users' moments.");
      };
    });
  }

};


$(document).ready(function (){
    sparkrApp.usersHTML = Handlebars.compile( $('#userTemplate').html() );
    sparkrApp.loadUsers();

    sparkrApp.currentUserHTML = Handlebars.compile( $('#current_userTemplate').html() );
    sparkrApp.showUser();

    sparkrApp.matchesHTML = Handlebars.compile( $('#matchTemplate').html() );
    sparkrApp.loadMatches();


    sparkrApp.showMoments(0,0);

    $('#not_like').on('click', function (event) {
      event.preventDefault();
      sparkrApp.showMoments(sparkrApp.userIndex += 1, sparkrApp.momentIndex);
    });

    $('#like').on('click', function (event) {
      event.preventDefault();
      $.ajax('/likes', {
        type: 'POST',
        data: {
          "like[user_id]": sparkrApp.user_id,
          "like[moment_id": sparkrApp.moment_id
        }
      }).done(function (result) {
        if (result.spark === true){
          alert('You have a match with '+ result.user.name);
        } else {
          if (sparkrApp.momentIndex == 2) {
            sparkrApp.momentIndex = 0;
            sparkrApp.showMoments(sparkrApp.userIndex += 1, sparkrApp.momentIndex);
          } else {
            sparkrApp.showMoments(sparkrApp.userIndex, sparkrApp.momentIndex +=1);
          };
        };
      });
    });
});



