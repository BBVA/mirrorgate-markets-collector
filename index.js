const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

service.getGooglePlayComments((reviews) => {
  service.sendComments(reviews, (err, res, body) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(res);
    process.exit(0);
  });
});



