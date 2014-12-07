Videos = new Mongo.Collection("videos");

if (Meteor.isClient) {

  Template.videos.helpers({
    videosToVote: function () {
      return Videos.find({estado:"paraVotar"});
    }
  });

  Template.videosToVoteButtons.helpers({
    videosToVote: function () {
      return Videos.find({estado:"paraVotar"});
    }
  });

  Template.videos.events({
    'click button': function () {
      // increment the counter when button is clicked
    }
  });

  Template.videosToVoteButtons.events({
    "click .votingButtons": function (event) {
      var votedVideo = event.target.value;
      console.log(votedVideo);
      var videoID = Videos.findOne({name: votedVideo});
      console.log(videoID);
      Videos.update({_id: videoID._id}, {$inc: {votesToday: 1, votesHistory: 1}});
    } 
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
