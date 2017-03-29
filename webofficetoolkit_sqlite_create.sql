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
	photo blob
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
	project integer,
	name text,
	code text,
	type text,
	startDate datetime,
	deadLine datetime
);

CREATE TABLE Workflow (
	id integer PRIMARY KEY AUTOINCREMENT,
	task integer,
	employee integer,
	minutesSpent integer,
	dateLog datetime,
	comment text
);

CREATE TABLE LocationUsing (
	id integer PRIMARY KEY AUTOINCREMENT,
	locationId integer,
	employeeId integer
);

CREATE TABLE EmployeeRole (
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

CREATE TABLE User (
	id integer PRIMARY KEY AUTOINCREMENT,
	username text,
	password text,
	email text,
	cellphone text,
	profile integer
);

CREATE TABLE ApplicationRole (
	id integer PRIMARY KEY AUTOINCREMENT,
	code text,
	title text,
	description text
);

CREATE TABLE UserApplicationRole (
	id integer PRIMARY KEY AUTOINCREMENT,
	role integer,
	user integer
);

CREATE TABLE ApplicationRight (
	id integer PRIMARY KEY AUTOINCREMENT,
	code text,
	title text,
	description text
);

CREATE TABLE ApplicationRoleRight (
	id integer PRIMARY KEY AUTOINCREMENT,
	role integer,
	right integer
);

CREATE TABLE Issue (
	id integer PRIMARY KEY AUTOINCREMENT,
	code text,
	type integer,
	title text,
	description text,
	project integer,
	creator integer,
	assignee integer
);

CREATE TABLE Attachment (
	id integer PRIMARY KEY AUTOINCREMENT,
	isRemote text,
	remoteUrl text,
	file blob,
	creationDate datetime,
	relatedIssue integer,
	uploader integer
);

CREATE TABLE Dashboard (
	id integer PRIMARY KEY AUTOINCREMENT,
	title text,
	description text,
	location integer
);

CREATE TABLE DashboardMaintainer (
	id integer PRIMARY KEY AUTOINCREMENT,
	maintainer integer,
	dashboard integer
);

CREATE TABLE DashboardPost (
	id integer PRIMARY KEY AUTOINCREMENT,
	title text,
	description text,
	creationDate datetime,
	creator integer,
	dashboard integer
);

CREATE TABLE ProjectVersion (
	id integer PRIMARY KEY AUTOINCREMENT,
	project integer,
	status text,
	startDate datetime,
	endDate datetime,
	version text,
	repositoryUrl text,
	repositoryBranch text
);
