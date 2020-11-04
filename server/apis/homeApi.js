/* ==== /api/home ==== */

const route = require('express').Router();
const historyService = require('../services/historyService');

/* ===== home ===== */

route.get('/', function (req, res) {
    console.log("at /api/home");
    const randomComb = [];
    while (randomComb.length < 5) {
        const random = Math.floor(Math.random() * 930);
        if (random === 0) continue;
        randomComb.push(random);
    }
    historyService.getHistoryCombById(randomComb)
        .then((combs) => {
            res.json(combs);
        });
    // const comb_ids = [];
    // while (comb_ids.length < 935) {
    //     const random = Math.floor(Math.random() * 8145061);
    //     if (random === 0) continue;
    //     comb_ids.push(random);
    // }
    // console.log("started");
    // // historyService.removeInvalidComb([482727, 3497268, 9854])
    // historyService.removeInvalidComb(comb_ids)
    //     .then((result) => {
    //         console.log("done1")
    //         scenarioService.removeOutlierComb(result)
    //             .then((result2) => {
    //                 console.log("done2")
    //                 historyService.getNumberStats()
    //                     .then((numStat) => {
    //                         console.log("done3")
    //                         getCombScore(makeScoreBoard(numStat), result2, compare);
    //                     })
    //             });
    //     });
});

route.get('/testing', function (req, res) {
    const newPossibles = new Map();
    for (let i = 3791; i < 8144650; i++) {
        newPossibles.set(i, 1);
    }
    console.log("new Possibles : " + newPossibles.size);
});

function makeScoreBoard(ns) {
    let point = 1;
    const scoreBoard = [];

    for (let i = 0; i < ns.length - 1; i++) {
        scoreBoard[ns[i].num] = point;
        if (ns[i].percentage === ns[i + 1].percentage) continue;
        point++;
    }
    scoreBoard[ns[ns.length - 1].num] = ns[ns.length - 2].percentage === ns[ns.length - 1].percentage ? point : point + 1;
    return scoreBoard;
}

function getCombScore(sb, combs, compare) {
    combs.forEach(e => {
        e.score += sb[e.fir] + sb[e.sec] + sb[e.thi] + sb[e.fou] + sb[e.fif] + sb[e.six];
    });

    combs.sort(compare);
    for (let i = 0; i < 5; i++) {
        console.log(combs[i]);
    }
}

function compare( a, b ) {
    if ( a.score > b.score ){
        return -1;
    }
    if ( a.score < b.score ){
        return 1;
    }
    return 0;
}


module.exports = route;