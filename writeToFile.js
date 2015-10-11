var fs = require("fs");
module.exports.foo = function(info,callback){
  fs.readFile('notes.json', function(err,data) {
    if (err) {
      return console.error(err);
    }
    var res = JSON.parse(data);
    console.log("Note ID: " + info.id);
    console.log("Index of res.notes: " + res.notes.indexOf(info.id));
    console.log(res.notes);

    if(!res.notes[info.id]) {
      res.notes.push(info);
      fixJson();
    } else {
      res.notes.splice(info.id,1,info);
      fixJson();
    }
    console.log(res);
    fs.writeFile('notes.json', JSON.stringify(res,null,2), function(err) {
      if (err) {
        return console.error(err);
      }
      console.log("Write to file finished.");
      callback();
    });
    function fixJson(){
      for(var i = 0; i < res.notes.length; i++){
        res.notes[i].id = i;
        if(res.notes[i].created === "delNote") {
          console.log("res.created delNote");
          res.notes.splice(info.id, 1);
        }
      }
    }
  });
};