/* ==== /api/home ==== */

const route = require('express').Router();
const historyService = require('../services/historyService');
const scenarioService = require('../services/scenarioService');

/* ===== home ===== */

route.get('/', function (req, res) {
    historyService.getHistoryCombById(182)
        .then((comb) => {
            res.json(comb);
        });
});

module.exports = route;