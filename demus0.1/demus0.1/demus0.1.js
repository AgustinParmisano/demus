Videos = new Mongo.Collection("videos");

if (Meteor.isClient) {

  Template.videos.helpers({
    videosToVote: function () {
      var videosForVote = Videos.find({state:"forVote"});
      //console.log(videosForVote);
      return videosForVote; 
    },

    videoPlaying: function () {
      return Videos.find({state:"reproducing"});
    }
  });

  Template.videosToVoteButtons.helpers({
    videosToVote: function () {
      return Videos.find({state:"forVote"}, {sort: {actualPoints: -1}});
    }
  });

  Template.videos.events({
    'ended .videoPlaying': function () {
       
       console.log("TERMINO VIDEO: " + this.name);
       //Videos.update(this._id, {$set: {state: "forVote"} });
       var arraOfVideos = (Videos.find({state: "forVote"}, {sort: {actualPoints: -1}})).fetch();//.sort({actualPoints: -1}).limit(1);
       var mostVotedVideo = (arraOfVideos.slice(0,1));
       console.log(mostVotedVideo[0].name);
    }
  });

  Template.videosToVoteButtons.events({
    "click .votingButtons": function (event) {
      var votedVideo = event.target.value;
      console.log(votedVideo);
      var videoID = Videos.findOne({name: votedVideo});
      console.log(videoID);
      Videos.update({_id: videoID._id}, {$inc: {actualPoints: 1, historyPoints: 1}});
    } 
  });




}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
