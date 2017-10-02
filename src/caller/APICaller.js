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
const fs = require('fs');
const config = require('nconf');

config.argv()
  .env()
  .file('config/config.json');

let auth = new Buffer(config.get('MIRRORGATE_USER') + ':' + config.get('MIRRORGATE_PASSWORD').toString('base64'));
let PLATFORMS = {android: 'Android', ios: 'IOS'};

function APICaller() {
  this.getListOfApps = function() {

    let set = {};

    return new Promise((resolve, reject) => {
      request( {
        url: `${config.get('MIRRORGATE_ENDPOINT')}/api/applications`,
        headers: {
          'Authorization' : `Basic ${auth}`
        }
      }, (err, res, body) => {

        if (err) {
          return reject(err);
        }

        body = JSON.parse(body);
        if(body.status >= 400) {
          return reject({
            statusCode: body.status,
            statusMessage: body.error
          });
        }

        resolve(body
          .map((app) => {
            var parts = app.appId.split('/');
            if (PLATFORMS[parts[0].toLowerCase()]) {
              app.platform = parts[0];
              parts.shift();
              app.appId = parts[0];
            } else {
              app.platform = 'Android';
            }
            if (parts.length > 1) {
              app.appId = parts[0];
              app.country = parts[1];
            }
            return app;
          },
          this)
          .filter((app) => app.appId.indexOf('.') > 0));
      });
    });

  };

  this.sendReviewsToBackend = function(reviews) {

    return new Promise((resolve, reject) => {
      request(
          {
            url: `${config.get('MIRRORGATE_ENDPOINT')}/api/reviews`,
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization' : `Basic ${auth}`
            },
            body: JSON.stringify(reviews)
          },
          (err, res, body) => {
            if (err) {
              return reject(err);
            }
            body = JSON.parse(body);
            if(body.status >= 400) {
              return reject({
                statusCode: body.status,
                statusMessage: body.error
              });
            }
            resolve(res);
          });

    });
  };
}


module.exports = APICaller;