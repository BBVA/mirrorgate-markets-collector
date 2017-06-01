const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

/* Run as Lambda fucntion */
exports.handler = (event, context, callback) => {
  return start();
};

function start() {
  service.getGooglePlayComments((err, reviews) => {
    if (err) {
      return console.error(err);
    }
    service.sendComments(reviews, (err, res, body) => {
      if (err) {
        return console.error(err);
      }
      return console.log(body);
    });
  });

}

/* Run as local funciont */
return start();
