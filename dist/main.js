"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const config_1 = require("./config/config");
const response_interceptor_1 = require("./common/response.interceptor");
const custom_errors_1 = require("./errors/custom.errors");
const compression = require("compression");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix((0, config_1.Configs)().context);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Portfolio Resume Builder')
        .setDescription('Microservice to convert Resume into protfolio ')
        .setVersion('v1')
        .addTag('resfolio')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('resfolio/api', app, document);
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.useGlobalFilters(new custom_errors_1.GlobalExceptionFilter());
    app.use(compression());
    app.useGlobalInterceptors(new response_interceptor_1.GlobalResponseInterceptor());
    await app.listen((0, config_1.Configs)().port, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map