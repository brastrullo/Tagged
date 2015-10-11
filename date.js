function d(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  return {
    getCalendarDate: function(){ return mm+'/'+dd+'/' +yyyy;},
    currentMonth: function(){return }
  };
}
