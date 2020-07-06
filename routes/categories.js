var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Category.findAll({
  }).then(function(categories){
    res.status(200).json({ categories : categories });
  });
});

router.post('/', function(req, res) {
  req.checkBody('name', 'name is required').notEmpty();
 
  // //Run the validators
  var errors = req.validationErrors();
  if(errors){
    return res.status(400).json(errors);
  } else{
    models.Category.create({
      name        : req.body.name,
      description : req.body.description,
      root_id     : req.body.root_id
    }).then(function() {
      res.status(200).json({status : 'success'});
    });
  }
});

router.delete('/:id', function(req, res) {
  models.Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.status(200).json({status : 'success'});
  });
});

router.put('/:id', function(req, res){
  models.Category.update(
  	{
  		name        : req.body.name,
      description : req.body.description,
      root_id     : req.body.root_id
  	},{
    	where: { id: req.params.id }
  	}
  ).then(function(result) {
  	console.log(result);
    res.status(200).json({status : 'success'});
  }).error(function(err){
  	res.status(500).json(err);
  });
});

module.exports = router;
