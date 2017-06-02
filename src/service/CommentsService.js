const request = require('request');
const APICaller = require('../caller/APICaller');
const GooglePlayCaller = require('../caller/GooglePlayCaller');

var caller = new APICaller();
var gpCaller = new GooglePlayCaller();

function CommentsService() { 
   
  this.getGooglePlayComments = function(cb){

    caller.getListOfApps((err, apps) => {

      if(err) {
        return cb(err);
      }

      apps.forEach((app) => {
        gpCaller.getReviews(app, cb);
      });
    });
  };
  
  this.sendComments = function(reviews, cb) {
    caller.sendReviewsToBackend(reviews, cb);
  };

}

module.exports = CommentsService;