var express = require('express');
var router = express.Router();

const User = require('./../models/User');

const parser = require('./../config/cloudinary');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signup', { title: 'Cloudinary Demo' });
});

router.get('/profile', function (req, res, next) {
  res.render('profile');
});

router.post('/signup', parser.single('profilepic'), function (req, res, next) {
  const { email, password } = req.body;
  console.log(req.file);
  const image_url = req.file.secure_url;

  const newUser = { email, password, profilepic: image_url };
  User.create(newUser)
    .then((data) => {
      res.render('profile', { newUser })
    })
    .catch((err) => console.log(err));

});

module.exports = router;

