import * as bcrypt from 'bcrypt';

export class BCrypt {
    public static hash(str: string) {
        return bcrypt.hash(str, 10);
    }
    public static match(str: string, hash: string) {
        return bcrypt.compare(str, hash);
    }
}