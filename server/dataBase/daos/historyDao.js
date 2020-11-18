const daoUtil = require('../daoUtility');

/* === select === */

exports.selectAllHistory = () => daoUtil.doQuery(
    `select * from history_view`
);

exports.selectLatestHistoryId = () => daoUtil.doQuery(
    `select count(*) as lastRound
    from history`
);

exports.selectHistoryCombById = (id) => daoUtil.doQuery(
    `select * from history_view
    where id IN (?)
    `,
    [id]
);

exports.selectHistoryCombByDate = (date) => daoUtil.doQuery(
    `SELECT * 
    FROM total 
    WHERE id = (SELECT comb_id FROM history WHERE date = ?)`,
    date
);

exports.hasAppearedById = (id) => daoUtil.doQuery(
    `select id from history where comb_id = ?`,
    id
);

exports.hasAppearedByComb = (comb) => daoUtil.doQuery(
    `select id from history_view 
    where fir = ? AND
    sec = ? AND
    thi = ? AND
    fou = ? AND 
    fif = ? AND 
    six = ?`,
    comb
);

exports.isConsecutive = (id) => daoUtil.doQuery(
    `select id from consecutives where id = ?`,
    id
);

exports.selectHistoryCombWith = (num) => daoUtil.doQuery(
    `select id from 
    (select h.id, h.comb_id, t.fir, t.sec, t.thi, t.fou, t.fif, t.six 
    from history 
    as h 
    join total 
    as t 
    on h.comb_id = t.id) r 
    where fir = ? 
    or sec = ? 
    or thi = ? 
    or fou = ? 
    or fif = ? 
    or six = ?`,
    [num, num, num, num, num, num]
);
