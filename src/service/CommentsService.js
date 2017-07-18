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
const AppInfoGatherer = require('../caller/AppInfoGatherer');

module.exports = class CommentsService {
  constructor() {
    this.caller = new APICaller();
    this.gatherer = new AppInfoGatherer();
  }

  getComments() {
    return this.caller.getListOfApps().then((apps) => {
      return Promise.all(apps.map((app) => {
        console.log('Collecting from: ' + JSON.stringify(app));
        return Promise
            .all([
              this.gatherer.getAppData(app)
                  .then((data) => {
                    console.log('App Data from ' + app.appId);
                    return data;
                  })
                  .catch((err) => {
                    console.error(
                        'Error collecting app data from ' + app.appId);
                    console.error(err);
                    return [];
                  }),
              this.gatherer.getReviews(app)
                  .then((data) => {
                    console.log('Data collected from ' + app.appId);
                    return data;
                  })
                  .catch((err) => {
                    console.error('Error collecting from ' + app.appId);
                    console.error(err);
                    return [];
                  }),
            ])
            .then((data) => {
              return data.reduce((acum, data) => acum.concat(data || []), []);
            });
      }));

    });
  };

  sendComments(reviews) { return this.caller.sendReviewsToBackend(reviews); };
}
