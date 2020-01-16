import { NextFunction, Request, Response } from 'express';
import { MySQL } from '../mysql/MySql';
import { BCrypt } from './BCrypt';
import { User } from './User';

export class Authentication {
    public static async register(name: string, password: string, email: string): Promise<User | undefined> {
        try {
            if (await Authentication.userExists(name, email)) return Authentication.login(name, password);

            await MySQL.queryWithTransaction('INSERT INTO user(name, email, password) VALUES(?, ?, ?)', [name, email, await BCrypt.hash(password)]);

            const id = (await MySQL.query('SELECT id FROM user WHERE name=?', [name]))[0].id;

            for (let i = 1; i <= 9; i++) {
                await MySQL.query(`INSERT INTO avatar(userId, level, topicId) VALUES(${id}, 0, ${i})`);
            }

            return await Authentication.login(name, password);
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }
    public static async login(name: string, password: string): Promise<User | undefined> {
        try {
            const result = await MySQL.query('SELECT * FROM user WHERE name=?', [name]);
            if (!result[0].password) throw 'no password';

            if (await BCrypt.match(password, result[0].password)) return new User(result[0].id, result[0].name, result[0].email, result[0].progress);
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }
    public static async userExists(name: string, email: string): Promise<boolean> {
        try {
            const result = await MySQL.query('SELECT * FROM user WHERE name=? OR email=?', [name, email]);
            return result.length !== 0;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    public static loginCheck(req: Request, res: Response, next: NextFunction): void {
        if (req.session?.user) next();
        else res.redirect('/login');
    }
}