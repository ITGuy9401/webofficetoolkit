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
    .then(function (err) {
        console.info('Connection to the database has been established successfully.');
    }, function (err) {
        console.error('Unable to connect to the database:', err);
    });

var db = {};

// Company Entity

db.Company = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    vat: {
        type: Sequelize.STRING
    },
    mainOffice: {
        type: Sequelize.INTEGER
    }
});

// Office Entity

db.Office = sequelize.define('office', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    companyId: {
        type: Sequelize.INTEGER
    }
});

db.Office.belongsTo(db.Company, {foreignKey: 'companyId'}); 

db.Company.hasOne(db.Office, {foreignKey: 'mainOffice', targetKey: 'companyId'}); 


// Employee Entity

db.Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        type: Sequelize.INTEGER
    }
});

db.Employee.belongsTo(db.Company, {foreignKey: 'companyId'});

db.Presence = sequelize.define('presence', {
    
});

// DOMAIN END
exports.database = db;
