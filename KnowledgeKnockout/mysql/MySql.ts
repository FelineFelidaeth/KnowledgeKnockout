import * as MySQLStore from 'express-mysql-session';
import * as mysql from 'mysql';
import { Connection, ConnectionConfig, FieldInfo, MysqlError } from 'mysql';

export class MySQL { // https://www.npmjs.com/package/mysql
    private static connection: Connection;
    private static initialized: boolean = false;
    private static _sessionStore: MySQLStore;
    private static connectionConfig: ConnectionConfig = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT + ''),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
    private static connectionConfigSessionStore: any = {
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 86400000,
        createDatabaseTable: true
    }
    private static initialize(): void {
        if (MySQL.initialized) return;

        MySQL.connection = mysql.createConnection(MySQL.connectionConfig);

        MySQL.connection.connect();

        MySQL._sessionStore = new MySQLStore(MySQL.connectionConfigSessionStore, MySQL.connection);

        MySQL.initialized = true;
    }
    public static get sessionStore(): MySQLStore {
        if (!MySQL.initialized) MySQL.initialize();
        return MySQL.sessionStore;
    }
    public static query(query: string, inserts?: any[]): Promise<any> { // https://www.npmjs.com/package/mysql#preparing-queries
        MySQL.initialize();
        return new Promise((resolve, reject) => MySQL.connection.query(query, inserts ? inserts.map(i => i.toString()) : [], (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => error ? reject(error) : resolve(results)));
    }
    public static beginTransaction(): Promise<MysqlError | void> {
        return new Promise((resolve, reject) => MySQL.connection.beginTransaction(error => error ? reject(error) : resolve()));
    }
    public static commit(): Promise<MysqlError | void> {
        return new Promise((resolve, reject) => MySQL.connection.commit(error => error ? reject(error) : resolve()));
    }
    public static rollback(): Promise<MysqlError | void> {
        return new Promise((resolve, reject) => MySQL.connection.commit(error => error ? reject(error) : resolve()));
    }
    public static async queryWithTransaction(query: string, inserts?: any[]): Promise<any> {
        MySQL.initialize();

        try {
            await MySQL.beginTransaction();

            const results = await MySQL.query(query, inserts ? inserts.map(i => i.toString()) : []);

            await MySQL.commit();

            return results;
        }
        catch (error) {
            await MySQL.rollback();

            throw error;
        }
    }
}