var express = require('express');
var router = express.Router();
var Slap = require('../models/slap');

/* GET users listing. */
router.get('/', function(req, res) {
  Slap.count()
    .success(function(count){
      res.send(JSON.stringify(count));
  });
});

router.get('/get/:id', function(req, res) {
  Slap.find({where: {fb_id: req.params.id}})
    .success(function(slap){
      if (slap) res.send(JSON.stringify(slap.count));
      else res.send(JSON.stringify(0));
    });
});

router.get('/add/:id', function(req, res) {

  Slap.find({where: {fb_id: req.params.id}})
    .success(function(slap){
      if (slap){
        // Increment and reply
        slap.increment('count')
          .success(function(afterIncrement){
            res.send(JSON.stringify(afterIncrement.count+1));
          })
          .error(function(err){
            res.send('Error incrementing: ' + err);
          });
      } else {
        // Create new
        Slap.create({fb_id: req.params.id, count: 1})
          .success(function(slap){
            res.send(JSON.stringify(slap.count));
          })
          .error(function(err){
            res.send('Error creating new slap: ' + err);
          });
      }
    })
    .error(function(err){
      res.send('Error fetching slap: ' + err);
    });
});

module.exports = router;
