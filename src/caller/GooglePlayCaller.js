const request = require('request');
const gplay = require('google-play-scraper');
const ReviewDTO = require('../dto/ReviewDTO');


function GooglePlayCaller() {

  this.getReviews = function(app, cb){
    gplay.reviews({  
      appId: app.appId,
      page: 0,
      sort: gplay.sort.NEWEST
    }).then((resolve, err) => {
      if(err) {
        return console.error(error);
      }
      
      var reviews = [];
      
      resolve.forEach((data) => {
        var review = new ReviewDTO(data);
        reviews.push(review);
      });
      
      cb(reviews);
    });
  };
}


module.exports = GooglePlayCaller;