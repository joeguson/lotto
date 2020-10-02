/* ==== /api/home ==== */

const route = require('express').Router();
const historyService = require('../services/historyService');
const scenarioService = require('../services/scenarioService');

/* ===== home ===== */

route.get('/', function (req, res) {
    historyService.getHistoryCombById(912)
        .then((result) => {
            res.json(result);
        });
});

module.exports = route;