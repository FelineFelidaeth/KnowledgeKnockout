import { randomizeArray } from '../helpers';
import { MySQL } from '../mysql/MySql';
import { Answer } from './Answer';
import { Question } from './Question';

export class Questions {
    public static async test(answerId: number, questionId: number): Promise<boolean> {
        try {
            const result = (await MySQL.query('SELECT isCorrect FROM answer WHERE id=? && questionId=?', [answerId, questionId]))[0];
            return !!result.isCorrect;
        }
        catch (error) {
            return false;
        }
    }
    public static async getRandomQuestion(topicId: number): Promise<Question> {
        try {
            const result = (await MySQL.query('SELECT * FROM question WHERE topicId=? ORDER BY RAND() LIMIT 1', [topicId]))[0];
            return new Question(result.id, result.blockId, result.topicId, result.content, result.imgSrc, result.secondsToSolve);
        }
        catch (error) {
            console.error(error);
            return new Question();
        }
    }
    public static async getQuestion(questionId: number): Promise<Question> {
        try {
            const result = (await MySQL.query('SELECT * FROM question WHERE id=?', [questionId]))[0];
            return new Question(result.id, result.blockId, result.topicId, result.content, result.imgSrc, result.secondsToSolve);
        }
        catch (error) {
            console.error(error);
            return new Question();
        }
    }
    public static async getAnswers(questionId: number): Promise<Answer[]> {
        try {
            const result = await MySQL.query('SELECT * FROM answer WHERE questionId=?', [questionId]);
            return randomizeArray(result.map((a: Answer) => new Answer(a.id, a.questionId, a.content, a.isCorrect, a.imgSrc)));
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
}