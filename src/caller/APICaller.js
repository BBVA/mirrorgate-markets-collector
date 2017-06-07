const request = require('request');
const config = require('../config/config');

function APICaller() {

  function filterByPlatformAndroid(value) {
    // TODO: return value.platform === 'Android';
    return true;
  }
  
  this.getListOfApps = function(){

    return new Promise((resolve, reject) => {
      request(config.mirrorgate_applist_url, (err, res, body) => {
        
        if(err) {
          return reject(err);
        }
        
        var apps = JSON.parse(body);
        var androidApps = apps.filter(filterByPlatformAndroid);
        resolve(androidApps);
      });
    }); 
    
  };
  
  this.sendReviewsToBackend = function(reviews){
    
    return new Promise((resolve, reject) => {
      request({
        url: config.mirrorgate_reviews_url,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(reviews)
      }, (err, res, body) => {
        if(err) {
          return reject(err);
        }
        resolve(res);
      });
  
    });
  };
    
}


module.exports = APICaller;