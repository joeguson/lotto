/* ==== /api/history ==== */

const route = require('express').Router();
const historyService = require('../services/historyService');

/* ===== history ===== */

route.get('/', function(req, res){
    cariService.getRandArticle()
        .then(([randPenobrol, randTandya, randYoutublog]) => {
            let result = randPenobrol.concat(randTandya);
            result = result.concat(randYoutublog);
            jsForBack.shuffle(result);
            let responseData = result;
            res.json(responseData);
        });
});

module.exports = route;