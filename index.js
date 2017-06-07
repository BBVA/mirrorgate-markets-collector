const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

function run() {  
  return service
    .getGooglePlayComments()
    .then( (reviews) => {
      return service
        .sendComments(reviews);
    });
}

/* Run as Lambda fucntion */
exports.handler = (event, context, callback) => {
  run()
    .then( (res) => {
      console.log(res);
      callback(null, res);
    })
    .catch( (err) => {
      callback(err); // Echo back the first key value
    });
};

/* Run as local funciont */
run()
  .then( (res) => {
    console.log(res);
    process.exit(0);
  })
  .catch( (err) => {
    console.log(err);
    process.exit(1);
  });
