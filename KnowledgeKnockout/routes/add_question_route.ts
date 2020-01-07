import { Request, Response } from 'express';
import * as path from 'path';
import { MySQL } from '../mysql/MySql';

export function add_question_route_get(req: Request, res: Response): void {
	console.log(path.resolve('./dist/views/add_question.html'));

	res.sendFile(path.resolve('./dist/views/add_question.html'));
	//res.send(req.body);
}

export async function add_question_route_post(req: Request, res: Response): Promise<void> {
	console.log(req.body);

	const questionContent: string = req.body.content;
	const wrongAnswers: string[] = [req.body.wrongAnswer01, req.body.wrongAnswer02, req.body.wrongAnswer03];
	const correctAnswer: string = req.body.correctAnswer;
	const topicId: string = req.body.topicId;
	const topicBlockId: string = req.body.topicBlockId;
	const secondsToAnswer = req.body.seconds;
	let lastQuestionId: number = 0;

	try {
		const sql: string = 'insert into question (content, blockId, topicId, secondsToAnswer) values (?, ?, ?, ?)';
		const inserts: string[] = [questionContent, topicBlockId, topicId, secondsToAnswer];
		//const results = await MySQL.query(sql, inserts);
		const results = await MySQL.queryWithTransaction(sql, inserts);
		lastQuestionId = results.insertId;
	}
	catch (error) {
		res.send(JSON.stringify({ success: false, error: error.code }));
		return;
	}

	try {
		const sql: string = 'insert into answer (questionId, content, isCorrect) values (?, ?, false), (?, ?, false), (?, ?, false), (?, ?, true)';
		const inserts: any[] = [lastQuestionId, wrongAnswers[0], lastQuestionId, wrongAnswers[1], lastQuestionId, wrongAnswers[2], lastQuestionId, correctAnswer];
		//await MySQL.query(sql, inserts);
		await MySQL.queryWithTransaction(sql, inserts);
		res.send(JSON.stringify({ success: true }));
	}
	catch (error) {
		res.send(JSON.stringify({ success: false, error: error.code }));
	}
}