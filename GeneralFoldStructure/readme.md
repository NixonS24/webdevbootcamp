This is a project that contains a typical file structure. 

This is a culmination of what I have seen in courses and what I have added on

New Project - using the MEAN* Stack
1) 'npm init'
    - Naivgate through walkthough
    - Change Entry point from 'index.js' to 'app.js'
	- We can tell this has worked through the existenc eof the "package.json" file
2) Install most common packages
    - 'npm install express body-parser ejs --save', the save wilnpl add it automtaically to our package json
    - Also nodemon is really good for testing is "npm install -g nodemon --save"
    - There is a list of common packages in "packageDescription.md"
    - remember the ''...--save' as that will automatically add the package to your package.json
3) Configure Database 
    - We will start with local but eventual we will a extenal/production server as well.
    - MongoDB will autmoatically create a local database fromt the code we have sent, if confused good instruction on Udemy Webdevelopment for MongoDb
    - Also look through the docs <https://community.c9.io/t/setting-up-mongodb/1717>
    - And remember the database needs to be running in a terminal window to access the database - "./mongod" 
    - To setup external server, we will use a combination of heroku and mLab - notes in dropbox (importantly remember to add "start: node app.js")
4) Create base File 
    - We need to create the base file structure, which can be copied over or created manually (i.e. "app.js")
    - Then git init, and link to a repositery
    - However, if you are lost regarding ejs is a good tutorial on <•	https://scotch.io/tutorials/use-ejs-to-template-your-node-application> and look to your notes.
5) Preview
    - We can run a preview through the both the browser and the our Cloud9 Enviroment.
    - If we run "node ..." on the main file, or "node app.js" and then click preview we will get a url that we can navigate and preview our sight.
6) Exit
    - When finishing up for the day, remember to close down the workspace 
    - Control + C on our database (mongod) and our app.js, otherwise we may have to repair our workspace
    
Also note, if you get stuck you have notes - "Udemy Notes" in dropbox.
MEAN is short for MEAN Stack:
    Mongo - Database both local and external through mLab.
    Express - 
    Angual - control user states
    Node - javascript backend