var restify = require('restify'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://x:y@z');

var server = restify.createServer();

var SlapSchema = new mongoose.Schema({
  id: {type: ObjectId}
  fbid: { type: String, trim: true, required: true }
  , count: { type: Number, required: true, default: 0 }
});

var Slap = mongoose.model('Slap', SlapSchema);

function add(req, res, next) {
  Slap.findOne({fbid: '1'}, function(err, item){
    console.log(err, item);
    item.count = item.count++;
    item.update(function(err, savedItem){
      console.log('saved:', err, savedItem);
    });
    console.log('post-save');
    res.send(JSON.stringify(item.count));
    return next();
  });
}

function send(req, res, next) {
  console.log(req.params);
  Slap.findOne({fbid: '1'}, function(err, item){
    console.log(item);
    console.log(item.count);
    res.send(JSON.stringify(item.count));
    return next();
  });
}

server.get({path: '/get/:id'}, send);
server.get({path: '/add/:id'}, add);

server.listen(8080);