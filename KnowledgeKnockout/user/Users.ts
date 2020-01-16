import { User } from './User';

export class Users {
    private static users: Map<string, User> = new Map();
    public static set(sessionID: string, user: User): void {
        user.sessionID = sessionID;
        Users.users.set(sessionID, user);
    }
    public static get(sessionID: string): User | undefined {
        return Users.users.get(sessionID);
    }
    public static remove(sessionID: string): void {
        Users.users.delete(sessionID);
    }
    public static get values(): User[] {
        return [...Users.users.values()];
    }
}