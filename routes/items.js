var models = require('../models');
var express = require('express');
var async = require("async");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  models.Item.findAll({
  }).then(function (items) {
    res.status(200).json({ items: items });
  });
});

function getNewName(name) {
  var i = name.lastIndexOf('.');
  return (new Date()).getTime() + '.' + ((i < 0) ? '' : name.substr(i));
}

function fileUpload(files, name) {
  if (files.hasOwnProperty(name)) {
    let file = files[name];
    var imageName = getNewName(file.name);

    // Use the mv() method to place the file somewhere on your server 
    file.mv('files/' + imageName, function (err) {
      if (err)
        return err;
    });
    return true;
  } else {
    return false;
  }
}

router.post('/', function (req, res) {

  if (!req.files)
    return res.status(400).json({ status: 'No files were uploaded.' });

  req.checkBody('category_id', 'category_id is required').notEmpty();
  req.checkBody('category_id', 'category_id is required').isInt();
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('price', 'price is required').notEmpty();
  req.checkBody('price', 'price is integer').isFloat();

  // //Run the validators
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json(errors);
  } else {
    async.parallel([
      function (callback) {
        let file = req.files['image'];
        // var name = getNewName(file.name);

        file.mv('files/' + file.name, function (err) {
          if (err)
            return res.status(500).json(err);
        });

        models.Item.create({
          name        : req.body.name,
          description : req.body.description,
          price       : req.body.price,
          img_url     : 'files/' + file.name,
          category_id : req.body.category_id
        }).then(function () {
          res.status(200).json({ status: 'success' });
        });
      }
    ]);
  }
});

router.delete('/:id', function (req, res) {
  models.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.status(200).json({ status: 'success' });
  });
});

router.put('/:id', function (req, res) {
  let name = '';
  
  models.Item.findById(req.params.id).then(item => {
    name = item.img_url;
  })

  if (!req.files) {
    return res.status(400).json({ status: 'No files were uploaded.' });
  } else {
    let file = req.files['image'];
    file.mv('files/' + file.name, function (err) {
      if (err)
        return res.status(500).json(err);
    });
    name = 'files/' + file.name;
  }

  models.Item.update(
    {
      name        : req.body.name,
      description : req.body.description,
      price       : req.body.price,
      img_url     : name,
      category_id : req.body.category_id
    }, {
      where: { id: req.params.id }
    }
  ).then(function (result) {
    // console.log(result);
    res.status(200).json({ status: 'success' });
  }).error(function (err) {
    res.status(500).json(err);
  });
});

module.exports = router;
