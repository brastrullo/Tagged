'use strict';

angular.module('myApp.controller', [])
.controller('MainCtrl', ['$http', function($http) {
  var vm = this;
  var lastId = 0;
  var selected = undefined;
  var dateCreated = new Date();
  vm.deleteMode = false;
  vm.fields = {title: '', content: ''};
  vm.searchMode = false;
  vm.newNote = function(text) {
    document.getElementById('noteInput').value = '';
    vm.edit = {note: undefined};
    var res = {
        id: vm.lastId,
        title : "",
        content: text,
        created : dateCreated
    };
    postChanges(res);
  };

  vm.editMode = function(id){
    vm.edit = {note: id};
    console.log("editMode() ID:" + vm.edit.note);
  };
  
  vm.saveNote = function(id, title, text) {
    vm.edit = {note: undefined};
    var res = {
        id: id,
        title : title,
        content: text,
        created : dateCreated
    };    
    checkChanges(res);
  };

  vm.deleteNote = function(id) {
    vm.deleteMode = false;
    vm.del = {note:""};
    var res = {
      id: id,
      created : "delNote"
    };
    $http.post('http://localhost:3000/notes/',res)
      .then(function(response) {
      return $http.get('notes.json');
      })
      .then(updateNotes);
      console.log("deleteNote() ID:" + id);
  };

  vm.selectNote = function(id){
    vm.select = {active: id};
    if (selected === vm.select.active) {
      vm.select.active = undefined;
    }
    vm.edit = {note: undefined};
    vm.deleteMode = false;
    selected = vm.select.active;
  };

  function checkChanges(res){
    if (res.title !== vm.notes[res.id].title || res.content !== vm.notes[res.id].content){
      postChanges(res);
    }
  }

  function postChanges(res) {
      console.log("Sent data: " + JSON.stringify(res));
      $http.post('http://localhost:3000/notes/',res)
        .then(function(response) {
        return $http.get('notes.json');
        })
        .then(updateNotes);
    }

  function updateNotes(response) { 
    vm.notes = response.data.notes;
    vm.lastId = Number(vm.notes.length);
  }

  window.pressedEnter = function (e){
      if(e.keyCode === 13){
          vm.newNote();
      }
      return false;
  };

  $http.get('notes.json').then(updateNotes);
}]);

