const request = require('request');
const gplay = require('google-play-scraper');
const ReviewDTO = require('../dto/ReviewDTO');

function GooglePlayCaller() {
  
  this.getReviews = function(app){
    
    return new Promise( (resolve, reject) => {
      
      if(!app.appId) {
        return reject('Wrong app Id');
      }
      
      gplay.reviews({  
        appId: app.appId,
        page: 0,
        sort: gplay.sort.NEWEST
      }).then((res) => {
        var reviews = [];
        
        res.every((data) => {

          if(app.commentId === data.id) {
            return false;
          }
          var review = new ReviewDTO(data);
          review.setAppName(app.appName);
          reviews.push(review);
          return true;
        });
        resolve(reviews);
      })
      .catch( (err) => {
        reject('err');
      });  
    });
  };
}

module.exports = GooglePlayCaller;