// lotto
const historyDao = require('../dataBase/daos/historyDao');
const historyAnalyzeDao = require('../dataBase/daos/historyAnalyzeDao');
const combParser = require('../dataBase/parsers/combParser');

exports.getHistory = async () => {
    return (await historyDao.selectAllHistory()).map(e => combParser.parseHistory(e));
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

exports.getNumberPoolByCycle = async () => {
    const history = await __getHistory();
    const cycleArr = [];
    for (let i = 0; i < 45; i++) {
        cycleArr[i] = [];
    }
    const lastGame = history.length;

    let minSum = 1000;
    let maxSum = 0;

    for (let i = 0; i < lastGame; i++) {
        if (history[i].sum > maxSum) maxSum = history[i].sum;
        if (history[i].sum < minSum) minSum = history[i].sum;

        const combinationArr = history[i].combination;
        for (let j = 0; j < combinationArr.length; j++) {
            cycleArr[combinationArr[j] - 1].push(history[i].id);
        }
    }

    const cycleStatuses = [];
    for (let i = 0; i < cycleArr.length; i++) {
        const cycleStatus = getCycles(cycleArr[i], lastGame);
        cycleStatus.number = i + 1;
        cycleStatuses.push(cycleStatus);
    }

    const absenceRank = [];
    for (let i = 0; i < cycleStatuses.length; i++) {
        if (absenceRank[cycleStatuses[i].absenceTillNow] == null) {
            absenceRank[cycleStatuses[i].absenceTillNow] = [];
        }
        absenceRank[cycleStatuses[i].absenceTillNow].push(cycleStatuses[i].number);

    }

    for (let i = absenceRank.length - 1; i >= 0; i--) {
        if (absenceRank[i] == null) absenceRank.splice(i, 1);
    }

    const numberPool_cycle = [];
    let count = 0;
    for (let j = absenceRank.length - 1; j >= 0; j--) {
        const cycleGroup = absenceRank[j];
        for (let k = 0; k < cycleGroup.length; k++) {
            for (let i = 0; i < absenceRank.length - count; i++) {
                numberPool_cycle.push(cycleGroup[k]);
            }
        }
        count++;
    }
    return {
        minSum : minSum,
        maxSum : maxSum,
        numberPool_cycle : numberPool_cycle
    }
}

/* ===== local functions ===== */

async function __getHistory() {
    return (await historyDao.selectAllHistory()).map(e => combParser.parseHistory(e));
}

function getCycles(appearances, lastGame) {
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
        averageAppear : cycles.reduce(reducer) / cycles.length,
        lastAbsence : appearances[appearances.length - 1] - appearances[appearances.length - 2],
        absenceTillNow : lastGame - appearances[appearances.length - 1]
    }
}

