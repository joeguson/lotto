/* ==== /api ==== */

const api = require('express').Router();

const home = require('./homeApi');
const history = require('./historyApi');
const scenario = require('./scenarioApi');

api.use('/home', home);
api.use('/history', history);
api.use('/scenario', scenario);

module.exports = api;