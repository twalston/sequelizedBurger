var connection = require('../config/connection.js');

var orm = {
	selectAll: function(tableInput, callBack) {
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(error, result){
			if (error) throw error;
			callBack(result);
		});
	},
	insertOne: function(tableInput, columnName, value, callBack) {
		var queryString = "INSERT INTO ??(??) VALUES(?)";
		connection.query(queryString, [tableInput, columnName, value], function(error, result){
			if (error) throw error;
			callBack(result);
		})
	},
	updateOne: function(tableInput, columnName, value, id, callBack){
		var queryString = "UPDATE ?? SET ?? = ? WHERE id = ?"
		connection.query(queryString, [tableInput, columnName, value, id], function(error, result){
			if (error) throw error;
			callBack(result);
		})
	}
};

// export orm containing functions
module.exports = orm;