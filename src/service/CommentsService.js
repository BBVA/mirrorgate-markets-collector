const request = require('request');
const APICaller = require('../caller/APICaller');
const GooglePlayCaller = require('../caller/GooglePlayCaller');

function CommentsService() { 
  
  var caller = new APICaller();
  var gpCaller = new GooglePlayCaller();
   
  this.getGooglePlayComments = function(cb){
    
    caller.getListOfApps((apps) => {
      
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