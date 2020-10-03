const daoUtil = require('../daoUtility');

/* === select === */

exports.selectHistoryCombById = (id) => daoUtil.doQuery(
    `SELECT * 
    FROM lotto_all 
    WHERE id = (SELECT comb_id FROM lotto_history WHERE id = ?)`,
    id
);
