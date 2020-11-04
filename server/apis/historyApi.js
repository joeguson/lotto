/* ==== /api/history ==== */

const route = require('express').Router();
const historyService = require('../services/historyService');

/* ===== history ===== */

route.get('/', function (req, res) {
    historyService.getTest()
        .then((result) => {
            // 138.32904608788854
            const reducer = (acc, cur) => acc + cur;
            console.log(result.length);
            const history = result.map(e => {
                return [e.fir, e.sec, e.thi, e.fou, e.fif, e.six].reduce(reducer);
            });
            console.log(history.reduce(reducer) / result.length);
            res.send(result.length);
        })
});

route.get('/:num', function (req, res) {
    const num = req.params['num'];
    // historyService.postNumberAnalyze(num)
    //     .then((result) => {
    //         res.send(result);
    //     })
});

module.exports = route;