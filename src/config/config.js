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

module.exports = {
  mirrorgate_reviews_url: process.env.MIRRORGATE_REVIEWS_URL ||
      'http://localhost:8080/mirrorgate/api/reviews',
  mirrorgate_applist_url: process.env.MIRRORGATE_APPLIST_URL ||
      'http://localhost:8080/mirrorgate/api/applications',
  mirrorgate_langs: (process.env.MIRRORGATE_LANG_LIST || 'es,en').split(',')
};
