var Firebase = require("firebase");
var client = require('twilio')('AC900a0de23d59b50073f8025d7ec27bfa', '5fc225e0ae84b6ffe7a4169254b05bb9');
var url = require("url");

var newStoriesRef = new Firebase("https://hacker-news.firebaseio.com/v0/newstories/0");

newStoriesRef.on("value", function(snapshot) {
  var storyRef = new Firebase("https://hacker-news.firebaseio.com/v0/item/"+snapshot.val());

  storyRef.on('value', function(storySnapshot) {
    if(storySnapshot.val() === null) {
      return
    }

    var story = storySnapshot.val();
    var host = url.parse(story.url).host;
    storyRef.off();

    console.log(story.url);
    console.log(host);
    if(host === "github.com") {
      client.messages.create({
        body: story.by + " just posted " + story.title + "on HN!",
        to: "+18013692444", // your cell number
        from: "+18019215364" // your twilio number
      }, function(err, message) {
        console.log(message);
      });

    if(host === "austenallred.com") {
      client.messages.create({
        body: story.by + " just posted " + story.title + "on HN!",
        to: "+18013692444", // your cell number
        from: "+18019215364" // your twilio number
      }, function(err, message) {
        console.log(message);
      });  
    }
  });
});