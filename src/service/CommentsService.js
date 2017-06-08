const request = require('request');
const APICaller = require('../caller/APICaller');
const GooglePlayCaller = require('../caller/GooglePlayCaller');

var caller = new APICaller();
var gpCaller = new GooglePlayCaller();

function CommentsService() {  
   
  this.getGooglePlayComments = function(){
    
    return new Promise((resolve, reject) => {
      
      caller
        .getListOfApps()
        .then( (apps) => {

          allReviews = [];

          count=0;
          apps.forEach((app) => {
          
            gpCaller
              .getReviews(app)
              .then((reviews) => {
                  allReviews.push.apply(allReviews, reviews);
                  count++;
                  if(count === apps.length) {
                    resolve(allReviews);
                  }
                }
              ).catch( (err) => {
                console.error(err);
                count++;
                if(count === apps.length) {
                  resolve(allReviews);
                }
              });
          });
          
        })
        .catch( (err) => {
          reject(err);
        });
    });
  };
  
  this.sendComments = function(reviews) {
    return caller.sendReviewsToBackend(reviews);
  };

}

module.exports = CommentsService;