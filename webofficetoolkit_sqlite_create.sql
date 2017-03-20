CREATE TABLE Office (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text,
	location text,
	companyId integer
);

CREATE TABLE Employee (
	id integer PRIMARY KEY AUTOINCREMENT,
	companyId integer,
	name text,
	surname text,
	sex text,
	birthdate datetime,
	username text,
	password text,
	photo blob,
	enabled text
);

CREATE TABLE Presence (
	id integer PRIMARY KEY AUTOINCREMENT,
	officeId integer,
	employeeId integer,
	entranceDate datetime,
	exitDate datetime
);

CREATE TABLE Location (
	id integer PRIMARY KEY AUTOINCREMENT,
	officeId integer,
	locationName text,
	locationStatus text
);

CREATE TABLE Company (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text,
	vat text,
	mainOffice integer
);

CREATE TABLE Project (
	id integer PRIMARY KEY AUTOINCREMENT,
	owner integer,
	customer integer,
	name text,
	code text,
	startDate datetime,
	deadLine datetime
);

CREATE TABLE Task (
	id integer PRIMARY KEY AUTOINCREMENT,
	projectId integer,
	name text,
	code text,
	type text,
	startDate datetime,
	deadLine datetime
);

CREATE TABLE Workflow (
	id integer PRIMARY KEY AUTOINCREMENT,
	taskId integer,
	employeeId integer,
	minutesSpent integer,
	dateLog datetime,
	comment text
);

CREATE TABLE LocationUsing (
	id integer PRIMARY KEY AUTOINCREMENT,
	locationId integer,
	employeeId integer
);

CREATE TABLE employeeRole (
	id integer PRIMARY KEY AUTOINCREMENT,
	roleId integer,
	employeeId integer,
	startDate datetime,
	endDate datetime
);

CREATE TABLE Role (
	id integer PRIMARY KEY AUTOINCREMENT,
	companyId integer,
	name text,
	code text
);

CREATE TABLE Log (
	id integer PRIMARY KEY AUTOINCREMENT,
	user integer,
	type text,
	timestamp datetime,
	detail text
);

