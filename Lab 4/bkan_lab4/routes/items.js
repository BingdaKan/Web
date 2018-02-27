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
  res.render('list', {items: items});
});

router.get('/api', function(req, res, next) {
  res.json(items);
});

router.post('/', function(req, res, next) {
	console.log(findMaxId());
	var new_item_id;
	if((findMaxId()).id == null || (findMaxId()).id == ""){
		new_item_id = 1;
	}else{
		new_item_id = (findMaxId()).id + 1;
	}
	var new_item = {
		id: new_item_id,
		name: req.body.fullname,
		qty: req.body.qty,
		price: req.body.price,
		brand: req.body.brand
	};
	items.push(new_item);
	console.log(items);
	fs.writeFileSync(dataPath, JSON.stringify(items));

	res.redirect('/items/');
});

router.get('/add', function(req, res, next) {
	res.render('add', {item:{}});
});

router.route('/:item_id')
	.all(function(req, res, next){
		item_id = req.params.item_id;
		item = lookupItem(item_id);
		next();
	})
	.get(function(req,res,next){
		res.render('edit', {item: item});
	})
	.post(function(req,res,next){
		res.send('Post for item ' + item_id);
	})
	.put(function(req,res,next){
		item.name = req.body.fullname;
		item.qty = req.body.qty;
		item.price = req.body.price;
		item.brand = req.body.brand
		fs.writeFileSync(dataPath, JSON.stringify(items));

		res.redirect('/items/');
	})
	.delete(function(req,res,next){
		for (var i = 0; i < items.length; i++) {
			if (items[i].id === parseInt(item_id)) {
				items.splice(i, 1);
			}
		}
		fs.writeFileSync(dataPath, JSON.stringify(items));
		res.send('Delete for item ' + item_id);
	});

module.exports = router;
