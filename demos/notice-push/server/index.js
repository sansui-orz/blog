const express = require('express');
const app = express();
const webPush = require('web-push');

app.use(express.static('static'));

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  // console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "+
  //   "environment variables. You can use the following ones:");
  // console.log(webPush.generateVAPIDKeys());
  const keys = webPush.generateVAPIDKeys();
  process.env.VAPID_PUBLIC_KEY = keys.publicKey;
  process.env.VAPID_PRIVATE_KEY = keys.privateKey;
  // return;
}

webPush.setVapidDetails(
  'https://serviceworker.rs/',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

app.get('/vapidPublicKey', function(req, res) {
  res.send(process.env.VAPID_PUBLIC_KEY);
});

app.post('/register', function(req, res) {
  // A real world application would store the subscription info.
  res.sendStatus(201);
});

app.post('/sendNotification', function(req, res) {
  setTimeout(function() {
    webPush.sendNotification(req.body.subscription)
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(error) {
      res.sendStatus(500);
      console.log(error);
    });
  }, 10000);
});

app.get('/', function(req, res) {
  res.render();
});

app.listen(3002, () => {
  console.log('open http://127.0.0.1:3002');
});