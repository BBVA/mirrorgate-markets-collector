const request = require('request');
const APICaller = require('../caller/APICaller');
const GooglePlayCaller = require('../caller/GooglePlayCaller');

function CommentsService() { 
  
  var caller = new APICaller();
  var gpCaller = new GooglePlayCaller();
   
  this.getGooglePlayComments = function(cb){
    
    return caller.getListOfApps((err, apps) => {
      
      if(err) {
        return cb(err);
      }

      apps.forEach((app) => {
        gpCaller.getReviews(app, cb);
      });
      return;
    });
  };
  
  this.sendComments = function(reviews, cb) {
    return caller.sendReviewsToBackend(reviews, cb);
  };

}

module.exports = CommentsService;