//url - '/history'

const route = require('express').Router();

route.get('/', function (req, res) {
    console.log("at /history");
});

route.all('*', function(req, res){
    res.redirect('/history');
});

module.exports = route;