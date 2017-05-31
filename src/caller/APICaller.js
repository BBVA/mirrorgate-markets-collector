const request = require('request');
const config = require('../config/config');


function APICaller() {
  
  function filterByPlatformAndroid(value) {
    // TODO: return value.platform === 'Android';
    return true;
  }
  
  
  this.getListOfApps = function(cb){
    request(config.mirrorgate_applist_url, (err, response, body) => {
      if(err) {
        return console.error(error);
      }
      
      var apps = JSON.parse(body);
      var androidApps = apps.filter(filterByPlatformAndroid);
      cb(androidApps);
    });
  };
  
  this.sendReviewsToBackend = function(reviews, cb){
    request({
      url: config.mirrorgate_reviews_url,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(reviews)
    }, cb);

  };
    
}


module.exports = APICaller;