// lotto
const analyzeService = require('./analyzeService');
const historyService = require('./historyService');
const testService = require('./testService');

exports.drawLotto = async () => {
    const [numberPool_appearance, numberPool_cycle] = await Promise.all([
        analyzeService.getNumberPoolByAppearance(),
        historyService.getNumberPoolByCycle()
    ]);

    // numberPool_cycle is an object
    // numberPool_cycle contains maxSum and minSum

    const numberPool_final = numberPool_appearance.concat(numberPool_cycle.numberPool_cycle);

    const possibleCombinations = [];
    while (possibleCombinations.length < 5) {
        const newCombinationSet = new Set();
        while (newCombinationSet.size < 6) {
            const random = Math.floor(Math.random() * numberPool_final.length);
            newCombinationSet.add(numberPool_final[random]);
        }

        const newCombinationArr = Array.from(newCombinationSet).sort((a, b) => a - b);

        const testResult = await testService.testNewCombination(newCombinationArr, numberPool_cycle.minSum, numberPool_cycle.maxSum);
        if (testResult) possibleCombinations.push(newCombinationArr);
    }

    // const possibleCombinationsMap = new Map();
    // for (let i = 0; i < possibleCombinations.length; i++) {
    //     const stringifiedArr = JSON.stringify(possibleCombinations[i]);
    //     if (possibleCombinationsMap.has(stringifiedArr)) possibleCombinationsMap.set(stringifiedArr, possibleCombinationsMap.get(stringifiedArr) + 1);
    //     else possibleCombinationsMap.set(stringifiedArr, 1);
    // }
    //
    // console.log(possibleCombinationsMap);
    // console.log(possibleCombinationsMap.size);

    console.log(possibleCombinations);

    return possibleCombinations;
};