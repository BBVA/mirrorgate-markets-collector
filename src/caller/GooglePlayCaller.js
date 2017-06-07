const request = require('request');
const gplay = require('google-play-scraper');
const ReviewDTO = require('../dto/ReviewDTO');

function GooglePlayCaller() {
  
  this.getReviews = function(app, cb){
    
    if(!app.appId) {
      console.error('Wrong app Id');
      return;
    }
    
    gplay.reviews({  
      appId: app.appId,
      page: 0,
      sort: gplay.sort.NEWEST
    }).then((resolve, err) => {
      
      if(err) {
        return cb(err);
      }
      
      var reviews = [];
      
      resolve.every((data) => {

        if(app.commentId === data.id) {
          return false;
        }
        var review = new ReviewDTO(data);
        review.setAppName(app.appName);
        reviews.push(review);
        return true;
      });
      cb(null, reviews);
    });
  };
}

module.exports = GooglePlayCaller;