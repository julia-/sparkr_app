Handlebars.registerHelper("ifEqual", function(state, other, fn, inverse) {
     var condition = state!==other;
     if(condition){
        return inverse(this);
    }
    else{
      return fn(this);
    }
  });
 
  Handlebars.registerHelper("ifnotEqual", function(state, other, fn, inverse) {
     var condition = state!==other;
     if(condition){
      return fn(this);
    }
    else{
      return inverse(this);
    }
  });
 
  Handlebars.registerHelper("include", function(state, fn, inverse) {
    var arr = ["unscheduled", "scheduled"];
    var condition = jQuery.inArray(state,arr) > -1
    if(condition){
      return fn(this);
    }
    else{
      return inverse(this);
    }
  });
 
  Handlebars.registerHelper('create_select_tag', function(list, value, element, selected_elements, prompt_text) {
    var selected_array = [];
    if (typeof(selected_elements) == "number" || typeof(selected_elements) == "string"){
      selected_array.push(selected_elements.toString());
    }else{
      if(selected_elements || typeof(selected_elements) == "array"){
      $.each(selected_elements, function(key, object) {
        selected_array.push(object[value].toString());
      });
    }
    }
    var result=""
    if (prompt_text){
      result += '<option value="">' + prompt_text + '</option>'
    }
    for (var i=0; i<list.length; i=i+1)
    {
      if($.inArray(list[i][value].toString(), selected_array) >= 0){
        result = result + '<option value="'+ list[i][value] +'" selected="selected">'+ list[i][element] +'</option>'
      }else{
        result = result + '<option value="'+ list[i][value] +'">'+ list[i][element] +'</option>'
      }
    }
    return new Handlebars.SafeString(result);
  });
 
  Handlebars.registerHelper('list', function(items, fn) {
    var out = "<ul>";
    for(var i=0, l=items.length; i<l; i++) {
      out = out + "<li>" + fn(items[i]) + "</li>";
    }
    return out + "</ul>";
  });
 
  Handlebars.registerHelper('link', function(id, url, text, href_id_text, css, style) {
    text = Handlebars.Utils.escapeExpression(text);
    url  = Handlebars.Utils.escapeExpression(url);
    var result = '<a href="'+ url + id + '/'+ text +'" id="'+ href_id_text + id + '" class="'+ css +'" project_id="'+ id +'" style="'+ style +'">' + text + '</a>';
 
    return new Handlebars.SafeString(result);
  });
 
  Handlebars.registerHelper('edit_link', function(comment) {
    var result = "";
    if (comment.user_id == current_user_id){
      result =  "<a comment_id="+ comment.id +" "+ "story_id="+ comment.story_id+ " " + "class='editCommentClass' href=/stories/" + comment.story_id + "/comments/" + comment.id +"/edit" + ">" + "</a>";
    }
    return new Handlebars.SafeString(result);
  });
 
  Handlebars.registerHelper('div', function(css, div_id, id) {
    var result = 'id="'+ div_id + id+'"' + ' ' + 'class="'+ css + '"' + ' ' + 'project_id="'+ id + '"';
    // alert(result);
    return new Handlebars.SafeString(result);
  });
 
 
 
 
  Handlebars.registerHelper('state_change', function(value, project_id, story_id) {
      var href = "projects/"+project_id+"/stories/"+story_id+"/update";
      var v = {
        href : href,
        project_id : project_id,
        story_id : story_id
      }
      switch(value){
        case "unscheduled":
          v['ch_state'] = 'scheduled';
          v['button'] = 'scheduled';
          v['text'] = 'Schedule';
        break;
 
        case "scheduled":
          v['ch_state'] = 'started';
          v['button'] = 'started';
          v['text'] = 'Start';
        break;
 
        case "started":
          v['ch_state'] = 'finished';
          v['button'] = 'finished';
          v['text'] = 'Finish';
        break;
 
        case "finished":
          v['ch_state'] = 'delivered';
          v['button'] = 'delivered';
          v['text'] = 'Deliver';
        break;
 
        case "delivered":
          v['ch_state'] = 'accepted';
          v['button'] = 'accepted';
          v['ch_state1'] = 'rejected';
          v['button1'] = 'rejected';
          v['text'] = 'Accept';
        break;
 
        case "rejected":
          v['ch_state'] = 'started';
          v['button'] = 'restarted';
          v['text'] = 'Restart';
        break;
 
      }
      var t = Handlebars.compile($('#storyStateChangeLink').html());
      return t(v);
  });
 
  // It is used to show the errors messages
  Handlebars.registerHelper('errorList', function(message) {
    var out = "";
    $.each(message, function(key, val){
      out += "<li>";
      out += (key == 'general') ? (val.join("</li><li>")) : (Display.capitalizeFirstLetter(Display.humanize(key)) + ' ' + val.join("</li><li>"+ Display.capitalizeFirstLetter(Display.humanize(key)) +" "));
      out += "</li>";
    });
    return "<ul>" + out + "</ul>";
  });
 
  // It is used to format the date with type
  // Different type
  //default   ddd mmm dd yyyy HH:MM:ss  Sat Jun 09 2007 17:46:21
  //shortDate   m/d/yy  6/9/07
  //mediumDate  mmm d, yyyy   Jun 9, 2007
  //longDate  mmmm d, yyyy  June 9, 2007
  //fullDate  dddd, mmmm d, yyyy  Saturday, June 9, 2007
  //shortTime   h:MM TT   5:46 PM
  //mediumTime  h:MM:ss TT  5:46:21 PM
  //longTime  h:MM:ss TT Z  5:46:21 PM EST
  //isoDate   yyyy-mm-dd  2007-06-09
  //isoTime   HH:MM:ss  17:46:21
  //isoDateTime   yyyy-mm-dd'T'HH:MM:ss   2007-06-09T17:46:21
  //isoUtcDateTime
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
 
 
//Helpers to evalute current users role