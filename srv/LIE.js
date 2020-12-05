
    ////////////////////////////////////////////////////////////////////////////////////////////
    //DECLAREATION
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    // Create express app

    var express = require('express');
    var fs = require('fs');
    var https = require('https');
    var md5 = require("md5")
    var bodyParser = require("body-parser");  //When we send POST data, normally this information is URL encoded from a form. 
                                            //We need to add some extra pre-processing to parse the body of POST requests 


    //MAIN

        //the main application object
        var app = express();

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());                           //The body-parser will convert raw post string into a javascript object JSON

        // Root endpoint - if nothing is requested
        app.get("/", (req, res, next) => 
        {
            res.json({"message":"Ok"})
        });

        // the database object referencing the sqlite db
        var db = require("./modules/database.js");

        // the user object class reference - it takes the app and the db as references inside of its constructor and adds .get/.post...endpoints to app
        const cUsers = require('./modules/classUsers.js');
        let oUsers = new cUsers(app, db);




        // Server port
        var HTTPS_PORT = 8000;

        // Start server
        https.createServer(
        {
            key: fs.readFileSync('./https-certificate/server.key'),
            cert: fs.readFileSync('./https-certificate/server.cert')
        }, app).listen(HTTPS_PORT, function () 
        {
            console.log("Server running on port %PORT%".replace("%PORT%",HTTPS_PORT));
        });
    

        ///////////////////////////////////////////////////////////////////////////////

        // Default response for any other request
        app.use(function(req, res)
        {
            res.status(404);
        });

    /// END MAIN




