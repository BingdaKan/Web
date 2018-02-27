var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');

var items = [];

var dataPath = 'data.json';

try {
	var stats = fs.statSync(dataPath);
	var dataString = fs.readFileSync(dataPath);
	items = JSON.parse(dataString);
} catch (e) {
	console.log('Data File Does Not Exist... Creating Empty File...');
	fs.writeFileSync(dataPath, JSON.stringify([]));
}

function lookupItem(item_id) {
  return _.find(items, function(c) {
    return c.id == parseInt(item_id);
  });
}

function findMaxId() {
  return _.max(items, function(item) {
  		return item.id;   	   
  });
}

router.get('/', function(req, res, next) {
  res.json(items);
});

router.get('/:item_id', function(req, res, next) {
  var item = items.getItemById(req.params.item_id);
  res.json(item);
});

items.getItemById = function(item_id){
	for (var i = 0; i < items.length; i++){
		if(items[i].id == item_id) return items[i];
	}
}

module.exports = router;