/*
 * Copyright (c) 2020. Created by Seung Joo Noh.
 * All rights reserved.
 */

exports.parseNumberStat = function (stat) {
    return {
        num : stat.id,
        appear : stat.appear,
        percentage : stat.percentage
    }
};