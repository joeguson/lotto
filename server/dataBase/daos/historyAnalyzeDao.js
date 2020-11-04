const daoUtil = require('../daoUtility');

/* === insert === */

exports.selectNumberAppearance = () => daoUtil.doQuery(
    `select n.id, count(t.val) 
    as count 
    from numbers n 
    left join 
    ( 
        select fir as val from history_view union all 
        select sec from history_view union all 
        select thi from history_view union all 
        select fou from history_view union all 
        select fif from history_view union all 
        select six from history_view
    ) t on n.id = t.val 
    group by n.id 
    order by count asc`
);

exports.countDuplicateComb = () => daoUtil.doQuery(
    `select comb_id, count(*) as c 
    from history 
    group by comb_id having c > 1`
)