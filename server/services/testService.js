// lotto
const historyDao = require('../dataBase/daos/historyDao');
const historyAnalyzeDao = require('../dataBase/daos/historyAnalyzeDao');
const combParser = require('../dataBase/parsers/combParser');

exports.getHistory = async () => {
    return (await historyDao.selectAllHistory()).map(e => combParser.parseHistory(e));
};

exports.testNewCombination = async (comb, minSum, maxSum) => {
    const sumTestMin = addCombination(comb) > minSum;
    const sumTestMax = addCombination(comb) < maxSum;
    const hasAppeared = (await historyDao.hasAppearedByComb(comb)).length > 0;
    const isConsecutive = (await historyAnalyzeDao.isConsecutive(comb)).length > 0;

    return sumTestMax && sumTestMin && !hasAppeared && !isConsecutive;
}

/* ===== local functions ===== */

async function __getHistory() {
    return (await historyDao.selectAllHistory()).map(e => combParser.parseHistory(e));
}

function addCombination(comb) {
    const reducer = (acc, cur) => acc + cur;
    return comb.reduce(reducer);
}

