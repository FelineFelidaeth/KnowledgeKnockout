import { Request, Response } from 'express';
import * as mysql from 'mysql';
import { MySQL } from '../mysql/MySql';
import * as path from 'path';

export function registry_route_post(req: Request, res: Response) {

	console.log(req.body);

	let name: string = req.body.name;
	let email: string = req.body.email;
	let password: string = req.body.password;
	let progress: number = 100000;
	let userId: number;

	let sql: string = 'insert into user (name, email, password) values (?, ?, ?)';
	let inserts: string[] = [name, email, password];

	MySQL.query(sql, inserts).then((results) => {
		userId = results.insertId;

		let sql: string = `insert into user (content) values (${mysql.escape(name)}), (${mysql.escape(email)}), (${mysql.escape(password)}), (${mysql.escape(progress)})`;
		MySQL.query(sql, []).then((results) => {
			res.send(JSON.stringify({ success: true }));
		}, (error) => {
			res.send(JSON.stringify({ success: false, error: error }));
		});
	}, (error) => {
		res.send(JSON.stringify({ success: false, error: error }));
	});
}

export function registry_route_get(req: Request, res: Response) {

	console.log(path.resolve('./dist/views/registration.html'));

	res.sendFile(path.resolve('./dist/views/registration.html'));
	//res.send(req.body);
}