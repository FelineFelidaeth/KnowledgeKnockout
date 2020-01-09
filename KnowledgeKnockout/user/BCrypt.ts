import * as bcrypt from 'bcryptjs';

export class BCrypt {
    public static hash(str: string): Promise<string> {
        return bcrypt.hash(str, 10);
    }
    public static match(str: string, hash: string): Promise<boolean> {
        return bcrypt.compare(str, hash);
    }
}