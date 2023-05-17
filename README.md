# README #

Authors: John Cornwell and Evan Witthun
Date: 12/12/2021

### What is this repository for? ###

* Quick summary

This website is intended to be used by a nonprofit organization to facilitate 
events. This website includes features for volunteers to help with event activities, 
donors to make contributions to an event or the organization, admins to create and 
manage users and events, and guests to browse future events.

* Version 1.0

### How do I get set up? ###

 The included [npSetup](https://github.com/JohnCornwell/NonprofitWebsite/blob/master/NonprofitWebsite/src/npSetup.sql) file should be used to generate a MySQL server that will contain all information used by this website. This server must be located on localhost:8200 and provide all priviledges to a user called 'nonprofit' with password 'nonprofit'. This website uses a config file called [config.json](https://github.com/JohnCornwell/NonprofitWebsite/blob/master/NonprofitWebsite/Server/server/config/config.json) where this information can be changed. The server that provides the client access to the database can be started in the [Server](https://github.com/JohnCornwell/NonprofitWebsite/tree/master/NonprofitWebsite/Server) directory using the command 'npm run start:dev'. The client may be started in the Nonprofit directory using the command 'ng serve --proxy-config proxy.config.json --open'. This repo should contain all dependencies needed in the relevant .json files, however, some may need to be downloaded. Necessary Angular files will be shown in the console when a user attempts to start the server and client.

### Who do I talk to? ###

This website was written by John Cornwell (Cornwell7432@gmail.com) and Evan Witthun (witthun1759@uwlax.edu)
