SET foreign_key_checks = 0;

DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Program;

DROP TABLE IF EXISTS Event;

DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS Volunteers;

DROP TABLE IF EXISTS Needs;

DROP TABLE IF EXISTS Donates;

DROP TABLE IF EXISTS Hosts;

SET foreign_key_checks = 1;

CREATE TABLE User (
UserID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
Username VARCHAR(64) UNIQUE NOT NULL,
Password TEXT NOT NULL,
FirstName TEXT NOT NULL,
MiddleName TEXT,
LastName TEXT NOT NULL,
UserType VARCHAR(50) NOT NULL,
Deleted BOOLEAN NOT NULL
);

CREATE TABLE Program (
ProgID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
Name VARCHAR(64) UNIQUE NOT NULL,
About TEXT
);

CREATE TABLE Event (
EventID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
Name VARCHAR(64) UNIQUE NOT NULL,
VolunteerNeed INTEGER NOT NULL,
DonationGoal INTEGER NOT NULL,
Month INTEGER NOT NULL, 
Day INTEGER NOT NULL,
Year INTEGER NOT NULL,
StartHour INTEGER NOT NULL,
StartMinute INTEGER NOT NULL,
EndHour INTEGER NOT NULL,
EndMinute INTEGER NOT NULL,
Description TEXT,
Deleted BOOLEAN NOT NULL
);

CREATE TABLE Volunteers (
UserID INTEGER NOT NULL,
EventID INTEGER NOT NULL,
Deleted BOOLEAN NOT NULL,
CONSTRAINT VolunteersUserID FOREIGN KEY (UserID)
REFERENCES User (UserID),
CONSTRAINT VolunteersEventID FOREIGN KEY (EventID)
REFERENCES Event (EventID)
);

CREATE TABLE Hosts (
ProgID INTEGER NOT NULL,
EventID INTEGER NOT NULL,
CONSTRAINT HostsProgID FOREIGN KEY (ProgID)
REFERENCES Program (ProgID),
CONSTRAINT HostsEventID FOREIGN KEY (EventID)
REFERENCES Event (EventID)
);

CREATE TABLE Donation (
DonationID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
Type VARCHAR(15) NOT NULL,
Month INTEGER NOT NULL, 
Day INTEGER NOT NULL,
Year INTEGER NOT NULL,
Amount DOUBLE NOT NULL,
Description TEXT
);

CREATE TABLE Donates (
UserID INTEGER NOT NULL,
DonationID INTEGER NOT NULL,
CONSTRAINT DonatesUserID FOREIGN KEY (UserID)
REFERENCES User (UserID),
CONSTRAINT DonatesDonationID FOREIGN KEY (DonationID)
REFERENCES Donation (DonationID)
);

CREATE TABLE Needs (
EventID INTEGER NOT NULL,
DonationID INTEGER NOT NULL,
CONSTRAINT NeedsEventID FOREIGN KEY (EventID)
REFERENCES Event (EventID),
CONSTRAINT NeedsDonationID FOREIGN KEY (DonationID)
REFERENCES Donation (DonationID)
);

/* password for admins is nonprofit */
INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('evan', '8ec5565e2f3dbce734fe276a0984dd38f1783c93aad5e640cf6921759776833b', 'Evan', '', 'Witthun', 'Admin', false);

INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('john', '8ec5565e2f3dbce734fe276a0984dd38f1783c93aad5e640cf6921759776833b', 'John', '', 'Cornwell', 'Admin', false);

/* password for donor is donor */
INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('donor', '62bd426180d319f9f847873183c590103cb6a07918f083787c44494d989737be', 'John', '', 'Cornwell', 'Donor', false);

/* password for volunteer is volunteer */
INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('volunteer', '16ad93f4b4d19514ead37291a4d112186e47ee51d6d5409947833c4d15961100', 'John', '', 'Cornwell', 'Volunteer', false);

INSERT INTO Program (Name, About)
VALUES ('Nonprofit Org 1', 'This is an example of a nonprofit Program in the system.
This Program cares about things and stuff.');

INSERT INTO Program (Name, About)
VALUES ('Nonprofit Org 2', 'This is an example of a nonprofit Program in the system.
Unlike Nonprofit Org 1, this Program cares about something.');

INSERT INTO event (Name, VolunteerNeed, DonationGoal, Month, Day, Year, StartHour, 
StartMinute, EndHour, EndMinute, Description, Deleted)
VALUES ('Nonprofit Org 1\'s Annual Event', 2, 300, 11, 21, 2021, 09, 00, 17, 00, 
'This is the annual event for Nonprofit Org 1 where we talk about things and stuff.', false);

INSERT INTO event (Name, VolunteerNeed, DonationGoal, Month, Day, Year, StartHour, 
StartMinute, EndHour, EndMinute, Description, Deleted)
VALUES ('Nonprofit Org 2\'s Annual Event', 2, 300, 11, 22, 2021, 08, 00, 16, 00, 
'This is the annual event for Nonprofit Org 2 where we talk about something.', false);

INSERT INTO event (Name, VolunteerNeed, DonationGoal, Month, Day, Year, StartHour, 
StartMinute, EndHour, EndMinute, Description, Deleted)
VALUES ('Event 3', 2, 300, 11, 22, 2021, 08, 00, 16, 00, 'NA', false);

INSERT INTO hosts (ProgID, EventID)
VALUES (1, 1);

INSERT INTO hosts (ProgID, EventID)
VALUES (2, 2);

INSERT INTO volunteers (UserID, EventID, Deleted)
VALUES (4, 2, false);

INSERT INTO volunteers (UserID, EventID, Deleted)
VALUES (4, 1, true);

