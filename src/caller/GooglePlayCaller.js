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
const gplay = require('google-play-scraper');
const ReviewDTO = require('../dto/ReviewDTO');
const config = require('../config/config');

function GooglePlayCaller() {

  this.getAppData = function(app){
    if(!app.appId) {
      return reject('Wrong app Id');
    }

    return gplay.app(
      {appId: app.appId}
    ).then((res) => {
      return [{
        appname: app.appName,
        starrating: res.score,
        platform: 'Android',
        amount: res.reviews
      }];
    });
  }
  
  this.getReviews = function(app){
          
    if(!app.appId) {
      return reject('Wrong app Id');
    }

    return Promise.all(config.mirrorgate_langs.map(function(lang) {
      return new Promise( (resolve, reject) => {
        gplay.reviews({  
          appId: app.appId,
          page: 0,
          sort: gplay.sort.NEWEST,
          lang: lang
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
        }).catch(reject);
      });
    })).then((langReviews) => {
      var reviews = [];
      langReviews.forEach(function(langReviews) {
        langReviews.forEach(function(review) {
          reviews.push(review);
        });
      });
      return reviews;
    });
  };
}

module.exports = GooglePlayCaller;