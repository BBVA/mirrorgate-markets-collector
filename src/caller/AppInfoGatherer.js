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
const ReviewDTO = require('../dto/ReviewDTO');
const moment = require('moment');
const fs = require('fs');
const config = require('nconf');

config.argv()
  .env()
  .file('config/config.json');

let scrapers = {
  ios: require('app-store-scraper'),
  android: require('google-play-scraper')
};

module.exports = class AppInfoGatherer {
  constructor() {}

  getAppData(app) {
    if (!app.appId) {
      return reject('Wrong app Id');
    }

    let scraper = scrapers[app.platform.toLowerCase()];

    return scraper.app({appId: app.appId, country: app.country, cache: false}).then((res) => {
      return [{
        appname: app.appName,
        starrating: res.score,
        platform: app.platform,
        amount: res.reviews,
        country: app.country
      }];
    });
  }

  getReviews(app) {
    if (!app.appId) {
      return reject('Wrong app Id');
    }

    let scraper = scrapers[app.platform.toLowerCase()];

    //Only android supports lang filtering
    let langs = app.platform === 'Android' ? config.get('MIRRORGATE_LANG_LIST') : [undefined];

    return Promise
        .all(langs.map(
            (lang) => scraper
                          .reviews({
                            appId: app.appId,
                            page: 0,
                            sort: scraper.sort.NEWEST,
                            lang: lang,
                            country: app.country,
                            cache: false
                          })
                          .then((res) => {
                            var reviews = [];

                            res.every((data) => {
                                //For Android Store
                                if(!(data.date instanceof Date)) {
                                    moment.locale(lang);
                                    data.date = moment.utc(data.date, 'LL').toDate();
                                }

                                let review = new ReviewDTO(data)
                                               .setAppName(app.appName)
                                               .setPlatform(app.platform);
                                reviews.push(review);
                                return true;
                            });
                            return reviews;
                          })))
        .then(
            (langReviews) => langReviews.reduce(
                (all, langReviews) =>
                    langReviews.reduce((all, review) => all.push(review) && all, all),
                []));
  }
}
