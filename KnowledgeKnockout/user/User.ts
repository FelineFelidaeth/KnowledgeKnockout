import { MySQL } from '../mysql/MySql';
import { Avatar } from './Avatar';

export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _progress: number;
    public avatars: Avatar[] = [];
    public sessionID: string = '';
    public isSearchingMatch: boolean = false;
    public isInMatch: boolean = false;

    public constructor(id: number, name: string, email: string, progress: number) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._progress = progress;

        MySQL.query('SELECT * FROM avatar WHERE userId=?', [this._id]).then(result => result.forEach((avatar: any) => this.avatars.push(new Avatar(avatar.id, avatar.level, avatar.topicId))));
    }

    public set name(val: string) {
        MySQL.query('UPDATE user SET name=? WHERE name=?', [val, this._name]);
        this._name = val;
    }

    public set email(val: string) {
        MySQL.query('UPDATE user SET email=? WHERE name=?', [val, this._name]);
        this._email = val;
    }

    public set progress(val: number) {
        MySQL.query('UPDATE user SET progress=? WHERE name=?', [val, this._name]);
        this._progress = val;
    }

    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get email(): string {
        return this._email;
    }
    public get progress(): number {
        return this._progress;
    }

    public getAvatar(topicID: number): Avatar {
        return <Avatar>this.avatars.find(avatar => avatar.topicId === topicID);
    }

    public get avatarTotalLevel(): number {
        return this.avatars.reduce((total, current) => total + current.level, 0);
    }

}