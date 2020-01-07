import { MySQL } from '../mysql/MySql';
import { BCrypt } from './BCrypt';
import { User } from './User';

export class Authentication {
    public static async register(email: string, password: string) {
        if (!await Authentication.userExists(email)) MySQL.query('INSERT INTO users (email, password, ...) VALUES (?, ?, ...)', [email, password/*, ...*/]);
    }
    public static async login(email: string, password: string) {
        const result = await MySQL.query('SELECT email, password FROM users WHERE email=?', [email]);
        if (await BCrypt.match(password, result.password)) return new User(email/*, ...*/);
        else return new User();
    }
    public static async userExists(email: string): Promise<boolean> {
        const result = await MySQL.query('SELECT email FROM users WHERE email=?', [email]);
        return !!result.email;
    }
}