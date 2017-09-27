/**
 * Created by zhaoxuebin on 2016/12/7.
 */
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://root:root@localhost:28008/Iva", {
    db: { w: 1, native_parser: false },
    server: {
        poolSize: 5,
        socketOptions: { connectTimeoutMS: 500 },
        auto_reconnect: true
    },
    replSet: {},
    mongos: {}
}, function(err, db) {
    if (!err) {
        console.log('Connected Via Connection String . . .');
        db.collection("user",function (err, user) {
            user.find(function (err, items) {
                items.toArray(function (err, itemArr) {
                    console.log("Doocument");
                    console.log(itemArr);
                })
            })
        })

        db.logout(function (err, result) {
            if (!err) {
                console.log("Logged out Via Connection String . . .");
            }
            db.close();
            console.log("Connection closed . . .");
        });
    } else {
        console.log("Connection Failed Via Connection String.");
    }
});