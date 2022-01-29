import mysql from 'mysql2/promise';
import * as logger from 'npmlog';

export class Database {
    private static connection: mysql.Connection;
    
    private constructor() {}

    public static getInstance() {
        if(!Database.connection) {
            Database.initialize();
        }

        return Database.connection;
    }

    private static async initialize() {
        mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB
        }).then((connection) => {
            logger.info('DATABASE', 'Connected.');
            Database.connection = connection;
            Database.connection.query('SELECT 1');
        }).catch((e) => {
            logger.info('DATABASE', 'Connection failed: %s', JSON.stringify(e, null, 2));
        });
    }

    /*
    public static async getMutedUsers() {
        const instance = Database.getInstance();
        if(!instance) return [];

        let [mutes] = await instance.query('SELECT * FROM discord_mutes WHERE active = 1');
        return mutes;
    }
 
    public static addMutedUser(issuerId: string, targetId: string, endDate: Date | null, reason: string | null) {
        const instance = Database.getInstance();
        if(!instance) return;

        instance.query(
            'INSERT INTO discord_mutes (issuerId, targetId, active, startDate, endDate, reason) VALUES (?,?,?,?,?,?)',
            [issuerId, targetId, 1, new Date(), endDate, reason]
        );
    }
 
    public static removeMutedUser(targetId: string) {
        const instance = Database.getInstance();
        if(!instance) return;

        instance.query(
            'UPDATE discord_mutes SET active = 0 WHERE targetId = ?',
            [targetId]
        );
    }
    */

    public static async isUserMuted(targetId: string) {
        const instance = Database.getInstance();
        if(!instance) return false;

        let [found] = await instance.query(
            'SELECT COUNT(id) as c FROM discord_mutes WHERE targetId = ? AND active = ?',
            [ targetId, 1 ]
        );
        return (found as any)[0]!.c > 0;
    }
}