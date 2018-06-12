// connects Node to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || '',
	database: process.env.MYSQL_DB || 'burgers_db'
})

// test connection 
connection.connect(function(error){
	if (error) throw error;
	console.log('Connected to ' + connection.threadId);
})


// export the connection
module.exports = connection;
