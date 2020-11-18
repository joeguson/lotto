// lotto
const scenarioDao = require('../dataBase/daos/scenarioDao');
const combParser = require('../dataBase/parsers/combParser');
const historyAnalyzeDao = require('../dataBase/daos/historyAnalyzeDao');

exports.getHistoryCombById = async (id) => {
    return combParser.parseCombination(await scenarioDao.selectHistoryCombById(id));
};

exports.removeOutlierComb = async (ids) => {
    const validComb = [];
    const temp = (await scenarioDao.getFullCombByIds(ids)).map(e => combParser.parseCombination(e));
    temp.forEach(t => {
        const combSum = t.fir + t.sec + t.thi + t.fou + t.fif + t.six;
        if (combSum > 72 && combSum < 204) {
            if (combSum < 88.5) t.score = 1;
            if (combSum >= 88.5 && combSum < 105) t.score = 2;
            if (combSum >= 105 && combSum < 121.5) t.score = 3;
            if (combSum >= 121.5 && combSum < 154.5) t.score = 4;
            if (combSum >= 154.5 && combSum < 171) t.score = 3;
            if (combSum >= 171 && combSum < 187.5) t.score = 2;
            if (combSum >= 187.5) t.score = 1;

            validComb.push(t);
        }
    })
    return validComb;
}

exports.getNumberPoolByAppearance = async () => {
    const appearanceCount = await historyAnalyzeDao.selectNumberAppearance();

    const appearanceCountMap =  new Map();
    const appearanceCountArr = [];
    let idx = 0;

    for (let i = 0; i < appearanceCount.length; i++) {
        if (i !== 0 && appearanceCountArr[idx - 1] === appearanceCount[i].count) continue;
        appearanceCountArr.push(appearanceCount[i].count);
        idx++;
    }

    appearanceCount.forEach(e => {
        if (appearanceCountMap.has(e.count)) {
            appearanceCountMap.get(e.count).push(e.id);
        }
        else appearanceCountMap.set(e.count, [e.id]);
    });

    const numberPool_appearance = [];
    for (let i = 0; i < appearanceCountArr.length; i++) {
        const count = appearanceCountArr[i];
        const numberGroup = appearanceCountMap.get(count);
        for (let j = 0; j < numberGroup.length; j++) {
            for (let k = 0; k < appearanceCountArr.length - i; k++) {
                numberPool_appearance.push(numberGroup[j]);
            }
        }
    }
    return numberPool_appearance;
}


