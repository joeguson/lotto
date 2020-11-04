// lotto
const analyzeService = require('./analyzeService');
const historyService = require('./historyService');

exports.drawLotto = async () => {

    const [appearancePool, cyclePool] = await Promise.all([
        analyzeService.getNumberPoolByAppearance(),
        historyService.getNumberPoolByCycle()
    ]);

    console.log(appearancePool);
    console.log(cyclePool);

    // get numbers' appearance and make group

};