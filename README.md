To develop this project i used the following stack:
* Java 8
* Micronaut
* Angular 8
* Bootstrap

The BE was implemented in this way:
* With Micronaut I created a filter to manage the login (only one user is coded for this test).
* I checked the JWT security token
* ATM information is retrieved from dropbox and saved in a cache with Micronaut and updated every 5 minutes.

The FE was implemented in this way:
* I split installed in "core" and "pages" modules
* "core" contains all the main parts used by the application
* "pages" contains the pages of the application
* I used the lazy loading mode to load only the pages visited.
* I created a BaseService to generalize REST calls.

For instructions launch:
* run-atm-be.cmd
* run-atm-fe.cmd
* once the last executable is finished, a chrome page will open with CORS disabled.
* you can access the application with user: sherlock pass: password