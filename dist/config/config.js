"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configs = void 0;
const Configs = () => {
    return {
        env: process.env.ENV || 'dev',
        context: process.env.CONTEXT || 'resfolio',
        port: parseInt(process.env.APP_PORT) || parseInt('3000'),
        databases: {
            mongo_db: {
                url: process.env.DATABASE_MONGO_URL ||
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
exports.Configs = Configs;
//# sourceMappingURL=config.js.map