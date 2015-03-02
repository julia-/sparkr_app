
// var hideMoment = function(){
//     console.log('hiding moment');
//     var $moment = $(this).closest('.moment');
//     // $moment.find('img, a').hide();
//     $moment.hide();
// };




var deleteMoment = function (event){
   var $moment = $(this).closest('.moment');
   var id = $moment.data('moment-id'); // id just a number not an jquery object
   var $singleMomentForm = $('.single-moment-form');
   $.ajax('/moments/' + id, {
     type: 'POST',
     data: {
       _method: 'DELETE'
     }
   }).done(function(){
     $moment.remove();
     $singleMomentForm.appendTo('.moments-container');
     $singleMomentForm.show();

     // $('.single-moment-form').html("<%= escape_javascript render('moments/single_moment_form') %>");
   });
 };





$(document).ready(function(){
  $('.moments-container').on('click', '.delete', deleteMoment); 
  
    // $.ajax DELETE request to server to delete img
    
    // $moment.find('input').show();
  // });

});



// $('.moment .delete').on('click', function () {
//   var $moment = $(this).closest('.moment');
//   $moment.find('img, a').hide();
  
//   // $.ajax DELETE request to server to delete img
  
//   $moment.find('input').show();
// });



// // first we create a taskApp object which is made up of three functions
// var taskApp = {
//     // the render tasks function loops through the tasks 
//     // (ask jack where this.tasks is coming from)
//     // (ask jack why we need this on this.tasks[i])
//     // and stores each individual task in a variable called task
//     // it adds the tasks's title to an li, and appends this to the tasks ul
//     renderTasks: function(){
//         $('#tasks').empty();
//         for (var i = 0; i < taskApp.tasks.length; i++){
//             var task = taskApp.tasks[i];
//             var li = this.taskHTML(task);
//             // $li.appendTo('#tasks');
//             $('#tasks').append(li);
//         }
//     },


//     // the create new task function stores the values of the title, description and completed
//     // fields in the form 
//     // it creates a post request
//     // the action is /tasks because that's where the data is being entered 
//     // each time we create a new task we create a new object, comprised of three key value pairs
//     // when we create a new task in ruby we allow the params like this
//     // params.require(:task).permit(:title, :description, :completed)
//     // our jquery post method is sending that data in the same form, and then calls getAllTasks

//     createNewTask: function(){
//         // console.log('create new');
//         var title = $('#task_title').val();
//         var description = $('#task_description').val();
//         var completed = $('#task_completed:checked').val();
//         console.log(title, description, completed);
//         if (completed === "1"){
//             completed = true
//         }else{
//             completed = false
//         }

//         // $.post( "/tasks", {
//         //     task: {
//         //         title: title,
//         //         description: description,
//         //         completed: completed
//         //     }
//         // }).done(taskApp.getAllTasks);

//         // this code chunk is the same as above
//         $.ajax('/tasks', {
//             type: 'POST',
//             dataType: 'json',
//             data: {
//                 "task[title]": title,
//                 "task[description]": description,
//                 "task[completed]": completed,

//             }
//         }).done(function(){
//             console.log('done');
//                 taskApp.tasks = tasks;
//                 taskApp.getAllTasks();
//                 $('#task_title').val('').focus();
//                 $('#task_description').val('');
//                 $('#task_completed').removeProp('checked');
//         })

//     }, 
//     // once the json request to /tasks is completed, 
//     // (ask jack why we pass in tasks and where taskss is coming from)
//     // what is taskApp.tasks = task doing?
//     // empty the tasks ul before we render the new list

//     toggleCompleted: function(event){
//         var $li = $(this).parent();
//         var id = $li.data('task-id');
//         $.ajax('/tasks/' + id + '/completed', {
//             type: 'POST'
//         }).error(function(){
//             alert('someting fucked up ');
//         });
//     },

//     deleteTask: function(event){
//         // debugger;
//         var $li = $(this).parent();
//         var id = $li.data('task-id');
//         $.ajax('/tasks/' + id,{
//             type: 'POST', 
//             data: {
//                 _method: 'DELETE'
//             }
//         }).done(function(){
//             $li.remove();
//         });
//     },

//     getAllTasks: function(){
//         $.getJSON('/tasks').done(function(result){
//             taskApp.tasks = result;
//             $('#tasks').empty();
//             taskApp.renderTasks();

//         });
//     // jquery is tryin got make a get request to these tasks, and what
//     // it gets back is a bunch of html, not JSON data 
//     // so we need to explain to the task controller how to serve up json 
//     // as well as html
//     }
// };

// $(document).ready(function(){

//     taskApp.taskHTML = Handlebars.compile( $('#taskTemplate').html() );

//     // when the document is ready, call get all tasks, so that the tasks are rendered on the page
//     taskApp.getAllTasks();

//     // when they click on submit, prevent the button from taking you to the new page
//     // by creating changing the default of the event
//     // and call create new task
//     $('#submit').on('click', function(event){
//         event.preventDefault();
//         taskApp.createNewTask();
//     });

//     // this means that we dont care how they submit it, 
//     // as long as they hit enter or click submit
//     // we can capture the form submission
//     $('#new_task').on('submit', function(event){
//         event.preventDefault();
//         taskApp.createNewTask();
//     });
//     // we dont need event delegation on this above form because the form is there from the very beginning



//     // this requires event delegation because tasks are added to the page dynamically
//     $('#tasks').on('click', ':checkbox', taskApp.toggleCompleted);

//     $('#tasks').on('click', '.delete', taskApp.deleteTask);


// });


