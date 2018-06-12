const express = require('express');

const router = express.Router();

const burgers = require('../models/burger.js')

// create router and render the html
router.get('/', function(request, response){
	burgers.selectAll(function(burgers){

		response.render('index', {
			burgers: burgers
		});
	});
});

router.post('/api/burgers', function(request, response){
	
	//Use Model to create a new burger object in mysql
	console.log(request.body);
	burgers.insertOne(request.body.burger_name, function(result){
		response.status(200).json({message: 'new burger'})
	})
});

router.put('/api/burgers/:id', function(request, response){

	var id = request.params.id;

	console.log(id);
	burgers.updateOne(request.body.devoured, id, function(result){
		response.status(200).json({message: 'changed devoured status'})
	})
})

module.exports = router;
