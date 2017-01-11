////////////////////////putting it all together now
var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){

        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });

    });

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});








// var express = require('express'),
//     app = express(),
//     engines = require('consolidate');
// // app.set('view engine', 'ejs');
// app.engine('.html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');

// app.get('/', function(req, res) {
//     res.render('hello',{'name':'Templates'});
// });

// app.use(function(req, res){
//     res.sendStatus(404); 
// });

// var server = app.listen(3000, function() {
//     var port = server.address().port;
//     console.log('Express server listening on port %s', port);
// });

//simple client on mongod and mongo=======================

// var MongoClient = require('mongodb').MongoClient,
//     assert = require('assert');

// var url = 'mongodb://localhost:27017/video';

// MongoClient.connect(url, function(err, db) {

//     assert.equal(null, err);
//     console.log("Successfully connected to server");

//     // Find some documents in our collection
//     db.collection('movies').find({}).toArray(function(err, docs) {

//         // Print the documents returned
//         docs.forEach(function(doc) {
//             console.log(doc.title);
//         });

//         // Close the DB
//         db.close();
//     });

//     // Declare success
//     console.log("Called find()");
// });


