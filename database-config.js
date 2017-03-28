/*globals require */
var Sequelize = require('sequelize');

var sequelize = new Sequelize('main', null, null, {
	// sqlite! now!
	dialect: 'sqlite',

	// the storage engine for sqlite
	// - default ':memory:'
	storage: 'webofficetoolkit.sqlite'
});

sequelize
	.authenticate()
	.then(() => {
		console.info('Connection to the database has been established successfully.');
	}, (err) => {
		console.error('Unable to connect to the database:', err);
	});

var db = {};

// Company Entity

db.Company = sequelize.define('company', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	vat: {
		type: DataTypes.STRING
	}
});

// Office Entity

db.Office = sequelize.define('office', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	location: {
		type: DataTypes.STRING
	}
});

db.Office.belongsTo(db.Company, {
	foreignKey: 'companyId'
});

db.Company.hasOne(db.Office, {
	foreignKey: 'mainOffice',
	targetKey: 'companyId'
});


// Employee Entity

db.Employee = sequelize.define('employee', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	surname: {
		type: DataTypes.STRING
	},
	sex: {
		type: DataTypes.STRING
	},
	birthdate: {
		type: DataTypes.DATE
	},
	photo: {
		type: DataTypes.BLOB
	}
});

db.Employee.belongsTo(db.Company, {
	foreignKey: 'companyId'
});

// Presence Entity

db.Presence = sequelize.define('presence', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	entranceDate: {
		type: DataTypes.DATE
	},
	exitDate: {
		type: DataTypes.DATE
	}
});

db.Employee.belongsTo(db.Presence, {
	foreignKey: 'employeeId'
});

db.Office.belongsTo(db.Presence, {
	foreignKey: 'officeId'
});

// DOMAIN END
exports.database = db;
