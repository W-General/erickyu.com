var http = require('http'); //importing http

function keepAlive() {
    setInterval(function() {
        var options = {
            host: 'ericyu.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 55 * 60 * 1000); // load every 55 minutes
}

exports.keepAlive = keepAlive;