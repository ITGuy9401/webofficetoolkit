"use strict";
var fs = require('fs');

if (!fs.existsSync('./webofficetoolkit.sqlite')) {
	console.log('Database not found. Creating it');
	let sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database('./webofficetoolkit.sqlite');
	console.log('Database file created. Creating the schema')
	db.serialize(function () {
		let createSql = fs.readFileSync('./webofficetoolkit_sqlite_create.sql', "utf8");
		db.exec(createSql, err => {
			if (err) {
				console.error('Error creating the database');
				console.error(err);
				throw new Error('Error creating the database', err);
			} else {
				console.log('Database created')
			}
		});
	});
	db.close();
}
