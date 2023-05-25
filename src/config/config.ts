/* eslint-disable prettier/prettier */
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

export const Configs = (): Config => {
  return {
    env: process.env.ENV || 'dev',
    context: process.env.CONTEXT || 'nexton',
    port: parseInt(process.env.APP_PORT) || parseInt('3000'),
    databases: {
      mongo_db: {
        url:
          process.env.DATABASE_MONGO_URL ||
          'mongodb://localhost:27017',
      },
    },
    jwt: {
      key: '1223425234523',
      secret: 'jldsfjaldjfalksfnasff747539745hfhafa',
      expires_in: '1d',
    },
  };
};
