/*globals require, exports */
(function(require, exports) {
    'use strict';
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
            dbConfig();
        }, (err) => {
            console.error('Unable to connect to the database:', err);
        });


    function dbConfig() {
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
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
            },
            surname: {
                type: Sequelize.STRING
            },
            sex: {
                type: Sequelize.STRING
            },
            birthdate: {
                type: Sequelize.DATE
            },
            photo: {
                type: Sequelize.BLOB
            }
        });

        db.Employee.belongsTo(db.Company, {
            foreignKey: 'companyId'
        });

        // Presence Entity

        db.Presence = sequelize.define('presence', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            entranceDate: {
                type: Sequelize.DATE
            },
            exitDate: {
                type: Sequelize.DATE
            }
        });

        db.Employee.belongsTo(db.Presence, {
            foreignKey: 'employeeId'
        });

        db.Office.belongsTo(db.Presence, {
            foreignKey: 'officeId'
        });

        // Role entity
        db.Role = sequelize.define('role', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING,
                unique: true
            }
        });

        db.Office.belongsTo(db.Role, {
            foreignKey: 'companyId'
        });

        // EmployeeRole entity
        db.EmplyeeRole = sequelize.define('employeeRole', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            startDate: {
                type: Sequelize.DATE
            },
            endDate: {
                type: Sequelize.DATE
            }
        });

        db.Role.belongsTo(db.EmployeeRole, {
            foreignKey: 'roleId'
        });

        db.Employee.belongsTo(db.EmployeeRole, {
            foreignKey: 'employeeId'
        });


        // LOG entity
        db.Log = sequelize.define('log', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.TEXT
            },
            timestamp: {
                type: Sequelize.DATE
            },
            detail: {
                type: Sequelize.TEXT
            }
        });

        db.Employee.belongsTo(db.Log, {
            foreignKey: 'user'
        });

        // Location Entity
        db.Location = sequelize.define('location', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            locationName: {
                type: Sequelize.TEXT
            },
            locationStatus: {
                type: Sequelize.TEXT
            }
        });

        db.Office.belongsTo(db.Location, {
            foreignKey: 'officeId'
        });

        // Location Using Entity

        db.LocationUsing = sequelize.define('locationUsing', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });

		  db.Location.belongsTo(db.LocationUsing, {
			  foreignKey: 'locationId'
		  });

		  db.Employee.belongsTo(db.LocationUsing, {
			  foreignKey: 'employeeId'
		  });

		  //Dashboard Entity
		  db.Dashboard = sequelize.define('dashboard', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
				title: {
					type: Sequelize.TEXT
				},
				description: {
					type: Sequelize.TEXT
				}
		  });

		  db.Office.belongsTo(db.Dashboard, {
			  foreignKey: 'location'
		  });

		  // Dashboard Maintainer Entity

		  db.DashboardMaintainer = sequelize.define('dashboardMaintainer', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
		  });

		  db.Dashboard.belongsTo(db.DashboardMaintainer, {
			  foreignKey: 'dashboard'
		  });

		  db.Employee.belongsTo(db.DashboardMaintainer, {
			  foreignKey: 'maintainer'
		  });

        // DOMAIN END
        // Exporting all database entities to the main application
        exports.database = {
            'entities': db,
            'sequelize': sequelize
        };

    }
})(require, exports);
