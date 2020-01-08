"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const MySql_1 = require("../mysql/MySql");
const path = require("path");
function registry_route_post(req, res) {
    console.log(req.body);

    let name = req.body.name;
    let email = req.body.email;
    let password = password;
    let progress = 100000;
    let userId = 0;

    let sql = 'insert into question (content, blockId, topicId) values (?, ?, ?)';
    let inserts = [name, email, password];

    MySql_1.MySQL.query(sql, inserts).then((results) => {
        lastQuestionId = results.insertId;
        let sql = `insert into answer (content) values (${mysql.escape(name)}), (${mysql.escape(email)}), (${mysql.escape(password)}), (${mysql.escape(progress)})`;
        MySql_1.MySQL.query(sql, []).then((results) => {
            res.send(JSON.stringify({ success: true }));
        }, (error) => {
            res.send(JSON.stringify({ success: false, error: error }));
        });
    }, (error) => {
        res.send(JSON.stringify({ success: false, error: error }));
    });
}

exports.registry_route_post = registry_route_post;
function registry_route_get(req, res) {
    console.log(path.resolve('./dist/views/registration.html'));
    res.sendFile(path.resolve('./dist/views/registration.html'));
    //res.send(req.body);
}

exports.registry_route_get = registry_route_get;
//# sourceMappingURL=add_question_route.js.map