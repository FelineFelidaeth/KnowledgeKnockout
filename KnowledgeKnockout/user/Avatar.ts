import { MySQL } from "../mysql/MySql";

export class Avatar {
    private _id: number;
    private _level: number;
    public topicBlockId: number;
    public constructor(id: number, level: number, topicBlockId: number) {
        this._id = id;
        this._level = level;
        this.topicBlockId = topicBlockId;
    }
    public get level(): number {
        return this._level;
    }
    public set level(val: number) {
        MySQL.query('UPDATE avatar SET level=? WHERE id=?', [val, this._id]);
        this._level = val;
    }
}