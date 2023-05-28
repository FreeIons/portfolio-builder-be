export interface Config {
    env: string;
    context: string;
    port: number;
    databases: {
        mongo_db: MongoDb;
    };
    jwt: {
        key: string;
        secret: string;
        expires_in: string;
    };
}
export interface MongoDb {
    url: string;
}
export declare const Configs: () => Config;
