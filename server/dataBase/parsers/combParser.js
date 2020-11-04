/*
 * Copyright (c) 2020. Created by Seung Joo Noh.
 * All rights reserved.
 */

exports.parseCombination = (comb) => {
    return comb.date ? parseFullComb(comb) : parseCombNumbersOnly(comb);
};

parseFullComb = (comb) => {
    return {
        id : comb.id,
        fir : comb.fir,
        sec : comb.sec,
        thi : comb.thi,
        fou : comb.fou,
        fif : comb.fif,
        six : comb.six
    }
}

parseCombNumbersOnly = (comb) => {
    return {
        fir : comb.fir,
        sec : comb.sec,
        thi : comb.thi,
        fou : comb.fou,
        fif : comb.fif,
        six : comb.six
    }
}

exports.parseHistory = (history) => {
    const historyObj = {};
    historyObj.id = history.id;
    historyObj.comb_id = history.comb_id;

    historyObj.combination = [];
    historyObj.combination.push(history.fir);
    historyObj.combination.push(history.sec);
    historyObj.combination.push(history.thi);
    historyObj.combination.push(history.fou);
    historyObj.combination.push(history.fif);
    historyObj.combination.push(history.six);

    historyObj.sum = history.sum;
    historyObj.date = history.date;

    return historyObj;
}