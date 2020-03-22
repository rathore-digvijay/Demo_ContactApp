var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

MongoClient.connect('mongodb://localhost:27017/MyDb', function(err, db) {
    db.collection('Persons', function(err, collection) {

        // app.all('/add', function(req, res) {
        //     res.send(req.body);
        //     collection.insert(req.body);
        //     console.log("ADD");

        // });

        app.all('/update', function(req, res) {
            var o = {};
            var flag = 0;
            if (!!req.body.name ) {
                o.name = req.body.name;
                flag++;
            }
            if(!!req.body.number ) {
                o.number = req.body.number;
                flag++;
            }
            if(flag != 0) {

                collection.update({cid : req.body.cid }, {$set : o}, { upsert : true }, function(err, result) {
                    if(err) throw err;
                    res.send(req.body);
                    console.log("UPDATE");

            
                });
            }
            else {
                res.send("Invalid Data");
            }
        });



        app.get('/viewlist', function(req, res) {
        collection.find().toArray(function(err, items) {
            if(err) throw err;
            res.send((items));
            console.log("VIEWLIST");

            });
      });

      app.all('/delete', function(req, res) {
          console.log(req.body.cid);
          collection.remove({cid : req.body.cid }, function(err, result){
               // console.log(err, result); 
              if(err) throw err;
              // if(result.result.n === 0){
                  res.send("Contact Removed");
                  console.log("DELETE");

              // }
          });
      });

    });

});


app.listen(3000, function() {
    console.log('App is running on port 3000');

});

