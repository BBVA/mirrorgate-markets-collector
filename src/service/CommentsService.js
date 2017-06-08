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