const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

function start() {
  
  return service.getGooglePlayComments((err, reviews) => {
    if (err) {
      return console.error(err);
    }
    
    service.sendComments(reviews, (err, res, body) => {
      if (err) {
        return console.error(err);
      }
      
      console.log(body);
    });
  });

}

/* Run as Lambda fucntion */
exports.handler = (event, context, callback) => {
  return start();
};

/* Run as local funciont */
return start();
