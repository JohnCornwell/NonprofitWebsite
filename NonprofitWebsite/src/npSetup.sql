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
Description TEXT
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

INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('evan', 'nonprofit', 'Evan', '', 'Witthun', 'Admin', false);

INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('john', 'nonprofit', 'John', '', 'Cornwell', 'Admin', false);

INSERT INTO user (Username, Password, FirstName, MiddleName, LastName, UserType, Deleted)
VALUES ('donor', 'donor', 'John', '', 'Cornwell', 'Donor', false);

INSERT INTO Program (Name, About)
VALUES ('Nonprofit Org 1', 'This is an example of a nonprofit Program in the system.
This Program cares about things and stuff.');

INSERT INTO Program (Name, About)
VALUES ('Nonprofit Org 2', 'This is an example of a nonprofit Program in the system.
Unlike Nonprofit Org 1, this Program cares about something.');

INSERT INTO event (Name, VolunteerNeed, DonationGoal, Month, Day, Year, StartHour, 
StartMinute, EndHour, EndMinute, Description)
VALUES ('Nonprofit Org 1\'s Annual Event', 2, 3, 11, 21, 2021, 11, 00, 23, 00, 
'This is the annual event for Nonprofit Org 1 where we talk about things and stuff.');

INSERT INTO event (Name, VolunteerNeed, DonationGoal, Month, Day, Year, StartHour, 
StartMinute, EndHour, EndMinute, Description)
VALUES ('Nonprofit Org 2\'s Annual Event', 2, 3, 11, 22, 2021, 11, 00, 23, 00, 
'This is the annual event for Nonprofit Org 2 where we talk about something.');

INSERT INTO hosts (ProgID, EventID)
VALUES (1, 1);

INSERT INTO hosts (ProgID, EventID)
VALUES (2, 2);

