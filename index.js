/*globals require, console, process */
"use strict";
const fs = require('fs');
var database = null;
new Promise(function (resolve, reject) {
	// Check if the database exists, otherwise, create it
	if (!fs.existsSync('./webofficetoolkit.sqlite')) {
		console.log('Database not found. Creating it');
		const sqlite3 = require("sqlite3").verbose();
		const db = new sqlite3.Database('./webofficetoolkit.sqlite');
		console.log('Database file created. Creating the schema')
		db.serialize(() => {
			let createSql = fs.readFileSync('./webofficetoolkit_sqlite_create.sql', "utf8");
			db.exec(createSql, (err) => {
				if (err) {
					console.error('Error creating the database');
					console.error(err);
					throw new Error('Error creating the database', err);
				} else {
					console.log('Database created');
				}

				db.close();
			});
		});
	}
}).then(startApp).catch(function (err) {
	console.error('Error on the starting up of the application', err);
	process.exit(1);
});

// App start
function startApp() {
	database = require('./database-config.js').database;
}