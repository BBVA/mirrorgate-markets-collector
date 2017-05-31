var config = {
  mirrorgate_reviews_url: process.env.MIRRORGATE_REVIEWS_URL || 'http://localhost:8080/mirrorgate/api/reviews',
  mirrorgate_applist_url: process.env.MIRRORGATE_APPLIST_URL || 'http://localhost:8080/mirrorgate/api/applications'
};

module.exports = config;