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

/* Run as Lambda fucntion */
const AWS = require('aws-sdk');
const config = require('nconf');

const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

config.argv()
  .env()
  .file('config/config.json');

function getComments(callback) {
  return service
    .getComments()
    .then((appsReviews) => {
      let reviews = [];
      if (appsReviews) {
        appsReviews.forEach(function(appReviews) {
          appReviews.forEach(function(review) { reviews.push(review); });
        });
      }
      if (reviews.length > 0) {
        console.log(`Comments found: ${reviews.length}`);
        service.sendComments(reviews)
            .then((res) => {
              console.log(res);
              callback(null, res);
            })
            .catch((err) => {
              console.log(`Error: ${JSON.stringify(err)}`);
              callback(`Error: ${JSON.stringify(err)}`);
            });
      } else {
        console.log('There are not comments to send');
        callback(null, 'There are not comments to send');
      }
    })
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
      callback(`Error: ${JSON.stringify(err)}`);
    });
}

exports.handler = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  if(config.get('S3_BUCKET_NAME') && config.get('S3_BUCKET_KEY')) {
    let s3 = new AWS.S3();
    s3.getObject({
      Bucket: config.get('S3_BUCKET_NAME'),
      Key: config.get('S3_BUCKET_KEY')
    }).promise()
      .then((data) => {
        data = JSON.parse(data.Body);
        config.set('MIRRORGATE_USER', data.MIRRORGATE_USER);
        config.set('MIRRORGATE_PASSWORD', data.MIRRORGATE_PASSWORD);
        getComments(callback);
      })
      .catch( err => console.error(`Error: ${JSON.stringify(err)}`));
  } else {
    getComments(callback);
  }

};
