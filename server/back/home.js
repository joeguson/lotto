//url - '/home'

const route = require('express').Router();
const homeService = require('../services/homeService');

route.get('/', function (req, res) {
    console.log("at /home");
    homeService.drawLotto()
        .then((result) => {
            console.log(result);
        })
});

route.all('*', function(req, res){
    res.redirect('/history');
});

module.exports = route;