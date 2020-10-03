// lotto
const historyDao = require('../dataBase/daos/historyDao');
const combParser = require('../dataBase/parsers/combParser');

exports.getHistoryCombById = async (id) => {
    return combParser.parseCombination(await historyDao.selectHistoryCombById(id));
};

exports.getHistoryCombByDate = async (id) => {
    return combParser.parseCombination(await historyDao.selectHistoryCombById(id));
};

exports.postHistoryComb = async (comb) => {
    return combParser.parseCombination(await historyDao.selectHistoryCombById(id));
};
