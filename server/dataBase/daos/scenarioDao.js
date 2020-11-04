const daoUtil = require('../daoUtility');

/* === select === */

exports.selectHistoryCombById = (id) => daoUtil.doQuery(
    `SELECT * 
    FROM total 
    WHERE id = (SELECT comb_id FROM history WHERE id = ?)`,
    id
);

exports.getFullCombByIds = (ids) => daoUtil.doQuery(
    `select * from total where id in(?)`,
    [ids]
);