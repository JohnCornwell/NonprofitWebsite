DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Organization;

DROP TABLE IF EXISTS Event;

DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS Supports;

DROP TABLE IF EXISTS Contributes;

DROP TABLE IF EXISTS Needs;

DROP TABLE IF EXISTS Donates;

DROP TABLE IF EXISTS Hosts;

CREATE TABLE User (
UserID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
Username TEXT UNIQUE NOT NULL,
Password TEXT NOT NULL,
FirstName VARCHAR(25) NOT NULL,
MiddleName VARCHAR(25),
LastName VARCHAR(25) NOT NULL,
--might want to include DOB
BirthMonth INTEGER NOT NULL,
BirthDay INTEGER NOT NULL,
BirthYear INTEGER NOT NULL,
UserType VARCHAR(50) NOT NULL,
Deleted BOOLEAN NOT NULL
);

CREATE TABLE Organization (
OrgID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
Name TEXT UNIQUE NOT NULL
);

CREATE TABLE Supports (
UserID INTEGER NOT NULL,
OrgID INTEGER NOT NULL,
CONSTRAINT UserID FOREIGN KEY (UserID)
REFERENCES User (UserID)
CONSTRAINT OrgId FOREIGN KEY (OrgID)
REFERENCES Organization (OrgID)
);

CREATE TABLE Event (
EventID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
Name TEXT UNIQUE NOT NULL,
MorningNeed INTEGER NOT NULL,
AfternoonNeed INTEGER NOT NULL,
NightNeed INTEGER NOT NULL,
Month INTEGER NOT NULL, 
Day INTEGER NOT NULL,
Year INTEGER NOT NULL,
StartHour INTEGER NOT NULL,
StartMinute INTEGER NOT NULL,
EndHour INTEGER NOT NULL,
EndMinute INTEGER NOT NULL,
Description BLOB,
CONSTRAINT OrgID FOREIGN KEY (OrgID)
REFERENCES Organization (OrgID)
);

CREATE TABLE Contributes (
UserID INTEGER NOT NULL,
EventID INTEGER NOT NULL,
CONSTRAINT UserID FOREIGN KEY (UserID)
REFERENCES User (UserID)
CONSTRAINT EventID FOREIGN KEY (EventID)
REFERENCES Event (EventID)
);

CREATE TABLE Hosts (
OrgID INTEGER NOT NULL,
EventID INTEGER NOT NULL,
CONSTRAINT OrgID FOREIGN KEY (OrgID)
REFERENCES Organization (OrgID)
CONSTRAINT EventID FOREIGN KEY (EventID)
REFERENCES Event (EventID)
);

CREATE TABLE Donation (
DonationId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
UserID INTEGER NOT NULL,
OrgID INTEGER NOT NULL,
Type VARCHAR(15) NOT NULL,
Month INTEGER NOT NULL, 
Day INTEGER NOT NULL,
Year INTEGER NOT NULL,
Amount DOUBLE NOT NULL,

CONSTRAINT UserID FOREIGN KEY (UserID)
REFERENCES User (UserID)
CONSTRAINT OrgID FOREIGN KEY (OrgID)
REFERENCES Organization (OrgID)
);

CREATE TABLE Donates (
UserID INTEGER NOT NULL,
DonationID INTEGER NOT NULL,
CONSTRAINT UserID FOREIGN KEY (UserID)
REFERENCES User (UserID)
CONSTRAINT DonationID FOREIGN KEY (DonationID)
REFERENCES Donation (DonationID)
);

CREATE TABLE Needs (
EventID INTEGER NOT NULL,
DonationID INTEGER NOT NULL,
CONSTRAINT EventID FOREIGN KEY (EventID)
REFERENCES Event (EventID)
CONSTRAINT DonationID FOREIGN KEY (DonationID)
REFERENCES Donation (DonationID)
);