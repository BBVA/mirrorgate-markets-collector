/*
 * Copyright 2017 Banco Bilbao Vizcaya Argentaria, S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = require('request');
const config = require('../config/config');

function APICaller() {

  
  this.getListOfApps = function(){

    let set = {};

    function filterByPlatformAndroid(value) {
      if(set[value.appId]) return false;
      set[value.appId] = true;
      return value.appId.indexOf('.') > 0;      
      // TODO: return value.platform === 'Android';
    }


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