/*
 * Copyright (c) 2020. Created by Seung Joo Noh.
 * All rights reserved.
 */

const mysql = require('mysql2');
const server = require('../lotto_web');
const pool = mysql.createPool(server.poolConfig);

exports.doQuery = (query, args) => {
    return new Promise(function(resolve, reject){
        pool.getConnection(function(err, connection) {
            if(err){ reject(err); }
            else connection.query(query, args, function(err, rows) {
                if(err){ reject(err); }
                else resolve(rows);
                connection.release();
            });
        })
    });
};

