import { MySQL } from '../mysql/MySql';

export class Avatar {
    private _id: number;
    private _level: number;
    public topicId: number;
    public constructor(id: number, level: number, topicId: number) {
        this._id = id;
        this._level = level;
        this.topicId = topicId;
    }
    public get level(): number {
        return this._level;
    }
    public get id(): number {
        return this._id;
    }
    public set level(val: number) {
        MySQL.query('UPDATE avatar SET level=? WHERE id=?', [val, this._id]);
        this._level = val;
    }
}