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
