"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtFactory = void 0;
const config_1 = require("@nestjs/config");
const config_2 = require("../config/config");
exports.jwtFactory = {
    imports: [config_1.ConfigModule],
    useFactory: async () => ({
        secret: (0, config_2.Configs)().jwt.key,
        signOptions: {
            expiresIn: (0, config_2.Configs)().jwt.expires_in,
        },
    }),
};
//# sourceMappingURL=auth.jwt.js.map