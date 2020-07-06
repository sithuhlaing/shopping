var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET inventory listing. */
router.get('/', function (req, res, next) {
  models.Inventory.findAll({
  }).then(function (inventories) {
    res.status(500).json({ inventories: inventories });
  });
});

/* POST creating inventory */
router.post('/', function (req, res) {
  req.checkBody('item_id', 'item_id is required').notEmpty();
  req.checkBody('item_id', 'item_id is required').isInt();
  req.checkBody('actual_quantity', 'actual_quantity is integer').isInt();
  req.checkBody('min_quantity', 'min_quantity is integer').isInt();

  //Run the validators
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    return res.status(400).json(errors);
  } else {
    models.Inventory.create({
      item_id         : req.body.item_id,
      actual_quantity : req.body.actual_quantity,
      min_quantity    : req.body.min_quantity
    }).then(function () {
      res.status(200).json({ status: 'success' });
    });
  }
});

/* DELETE deleting inventory */
router.delete('/:id', function (req, res) {
  models.Inventory.destroy({
    where: {
      id : req.params.id
    }
  }).then(function () {
    res.status(200).json({ status: 'success' });
  });
});

/* PUT updating inventories */
router.put('/:id', function (req, res) {

  models.Inventory.update(
    {
      item_id         : req.body.item_id,
      actual_quantity : req.body.actual_quantity,
      min_quantity    : req.body.min_quantity
    }, {
      where: { id: req.params.id }
    }
  ).then(function (result) {
    console.log(result);
    res.status(200).json({ status: 'success' });
  }).error(function (err) {
    res.status(500).json(err);
  });
});

module.exports = router;
