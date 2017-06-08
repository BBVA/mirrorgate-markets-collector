/* Run as Lambda fucntion */

const CommentsService = require('./src/service/CommentsService');

var service = new CommentsService();

exports.handler = (event, context, callback) =>  {
  
  context.callbackWaitsForEmptyEventLoop = false;

  service
    .getGooglePlayComments()
    .then( (reviews) => {
      if(reviews.length > 0){   
        service
          .sendComments(reviews)
          .then( (res) => {
            console.log(res);
            callback(null, res);
          })
          .catch( (err) => {
            callback(err);
          });
      } else {
        console.log('There are not comments to send');
        callback(null, 'There are not comments to send');
      }
    })
    .catch( (err) => {
      callback(err);
    });

};
