// lotto
const historyDao = require('../dataBase/daos/historyDao');
const historyAnalyzeDao = require('../dataBase/daos/historyAnalyzeDao');
const combParser = require('../dataBase/parsers/combParser');

exports.getHistory = async () => {
    return (await historyDao.selectAllHistory()).map(e => combParser.parseCombination(e));
};

exports.getHistoryCombById = async (id) => {
    return (await historyDao.selectHistoryCombById(id)).map(e => combParser.parseCombination(e));
};

exports.getHistoryCombByDate = async (id) => {
    return (await historyDao.selectHistoryCombById(id)).map(e => combParser.parseCombination(e));
};

exports.removeInvalidComb = async (ids) => {
    const validComb = [];
    for (const id of ids) {
        const hasAppeared = await historyDao.hasAppeared(id);
        const isConsecutive = await historyDao.isConsecutive(id);
        if (hasAppeared.length === 0 && isConsecutive.length === 0) {
            validComb.push(id);
        }
    }
    return validComb;
}

exports.postNumberAnalyze = async (num) => {
    const reducer = (acc, cur) => acc + cur;
    const analysis = {};
    const cycles = [];
    analysis.percentage = 0;
    analysis.cycle = 0;
    const lastRound = (await historyDao.selectLatestHistoryId())[0].lastRound;
    const result = (await historyDao.selectHistoryCombWith(num)).map(e => {
        return e.id;
    });
    analysis.appear = result.length;
    analysis.percentage = (result.length / lastRound) * 100;
    for (let i = 0; i < result.length - 1; i++) {
        cycles[i] = result[i + 1] - result[i];
    }
    analysis.cycle = cycles.reduce(reducer) / cycles.length;
    console.log(analysis);
    const analysisResult = await historyAnalyzeDao.insertHistoryAnalyze(analysis.appear, analysis.percentage, analysis.cycle)
    console.log(analysisResult);
    return analysisResult;
};

exports.getNumberPoolByCycle = async () => {
    const history = (await historyDao.selectAllHistory()).map(e => combParser.parseHistory(e));
    const cycleArr = [];
    for (let i = 0; i < 45; i++) {
        cycleArr[i] = [];
    }

    let minSum = 1000;
    let maxSum = 0;

    for (let i = 0; i < history.length; i++) {
        if (history[i].sum > maxSum) maxSum = history[i].sum;
        if (history[i].sum < minSum) minSum = history[i].sum;

        const combinationArr = history[i].combination;
        for (let j = 0; j < combinationArr.length; j++) {
            cycleArr[combinationArr[j] - 1].push(history[i].id);
        }
    }

    for (let i = 0; i < cycleArr.length; i++) {
        console.log(getCycles(cycleArr[i]));
    }

    return {
        minSum : minSum,
        maxSum : maxSum
    }
}

/* ===== local functions ===== */

function getCycles(appearances) {
    const reducer = (acc, cur) => acc + cur;
    let maxConsecutiveAppear = 0;
    let maxAbsence = 0;

    let countConsecutives = 0;
    const cycles = [];

    for (let i = 0; i < appearances.length - 1; i++) {
        const diff = appearances[i + 1] - appearances[i];
        if (diff > maxAbsence) maxAbsence =  diff;
        if (diff === 1) countConsecutives++;
        else if (diff > 1) {
            if (countConsecutives > maxConsecutiveAppear) maxConsecutiveAppear = countConsecutives;
            countConsecutives = 0;
        }
        cycles[i] = diff;
    }

    return {
        maxConsecutiveAppear : maxConsecutiveAppear,
        maxAbsence : maxAbsence,
        averageAppear : cycles.reduce(reducer) / cycles.length
    }
}

