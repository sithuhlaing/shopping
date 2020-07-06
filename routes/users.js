var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.Item.findAll({
  }).then(function (users) {
    res.status(200).json({ users: users });
  });
});

/* GET user profile. */
router.get('/profile', function(req, res, next) {
    res.status(200).json(req.user);
});

module.exports = router;