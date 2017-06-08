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

/* Run as local funtcion */

const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

service
  .getGooglePlayComments()
  .then( (reviews) => {
    if(reviews.length > 0){   
      service
        .sendComments(reviews)
        .then( (res) => {
          console.log(res);
          process.exit(0);
        })
        .catch( (err) => {
          console.log(err);
          process.exit(1);
        });
    } else {
      console.log('There are not comments to send');
      process.exit(0);
    }
  })
  .catch( (err) => {
    console.log(err);
    process.exit(1);
  });
