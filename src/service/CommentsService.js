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
    
    return caller
      .getListOfApps()
      .then( (apps) => {
        console.log('Processing apps: ' + JSON.stringify(apps));

        return Promise.all(apps.map((app) => {
          console.log('Collecting from: ' + JSON.stringify(app.appId))
          return gpCaller
              .getReviews(app)
              .then((data) => {
                console.log('Data collected from ' + app.appId);
                return data;
              })
              .catch( (err) => {
                console.error('Error collecting from ' + app.appId);
                console.error(err);
                return [];
              });
        }));

    });
  };
  
  this.sendComments = function(reviews) {
    return caller.sendReviewsToBackend(reviews);
  };

}

module.exports = CommentsService;