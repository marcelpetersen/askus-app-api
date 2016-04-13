var Firebase = require('firebase');
var firebase = new Firebase(process.env.FIREBASE_ADDRESS + '/');
var bodyParser = require('body-parser');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET);
var token = tokenGenerator.createToken(
   {uid: process.env.FIREBASE_UID}, 
   { expires: 9959963142 });

var userMethods = {};

// Delete User and user's posts
userMethods.delete = function(req, res) {
  var userId = req.params.id;

  var ref = new Firebase(process.env.FIREBASE_ADDRESS);
  var userMessagesRef = new Firebase(process.env.FIREBASE_ADDRESS + '/posts/');
  var userRef = new Firebase(process.env.FIREBASE_ADDRESS + '/users/');

  var userKey;
  var processError = false;

  // Server Login to the Firebase DB
  ref.authWithCustomToken(token, function(error, authData) {
    if (error) {
      console.log('Cannot log in to server');
      res.status(400).send(error);
    } else {
      
      // Get User informations
      userRef.orderByChild("id").equalTo(userId).once("value", function(snapshot) {
        if (snapshot.exists()) {
          for (first in snapshot.val()) {
            userKey = first;
            break;
          }

          // Get all posts from a user
          userMessagesRef.orderByChild("userId").equalTo(userId).once("value", function(snapshot) {
            var userMessages = snapshot.val();
            var userMessagesNumber = snapshot.numChildren()

            // Check if user has posts
            if (userMessagesNumber > 0) {
              for ( var message in userMessages) {
                // Delete all user posts
                userMessagesRef.child(message).remove(function(error) {
                  if (error) {
                    console.log('Message Delete failed');
                    processError = true;
                  } else {
                    //console.log('Message Delete succeeded');
                  }
                })
              }
              if (!processError) {
                // Delete User account data
                userRef.child(userKey).remove(function(error) {
                  if (error) {
                    console.log('User Delete failed');
                    res.status(400).send(error);
                  } else {
                    //console.log('User Delete succeeded');
                    res.sendStatus(200);
                  }
                })
              } else {
                res.status(400).send({error: "error while deleting message"});
              }
            } else {
              // Delete User account data
              userRef.child(userKey).remove(function(error) {
                if (error) {
                  console.log('User Delete failed');
                  res.status(400).send(error);
                } else {
                  //console.log('User Delete succeeded');
                  res.json({message: "user and messages Deleted"});
                }
              })
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.status(400).send(errorObject);
          });

        } else {
          res.status(400).send({error: "no such user"});
        }
      })
    }
  });
}

module.exports = userMethods;
