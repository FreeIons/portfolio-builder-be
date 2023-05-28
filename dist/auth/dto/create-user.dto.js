"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedUserResponse = exports.CreateUserValidation = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const JOI = require("joi");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client Id', type: String, required: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UserName', type: String, required: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email', type: String, required: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone Number', type: String, required: false }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Password', type: String, required: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;
exports.CreateUserValidation = JOI.object({
    username: JOI.string()
        .min(6)
        .max(100)
        .required()
        .messages({ name: `Name must be Provided` }),
    email: JOI.string().min(6)
        .email({ tlds: { allow: false } })
        .required(),
    client_id: JOI.string()
        .messages({ client_id: `client_id must be provided.` })
        .required(),
    phone_number: JOI.string()
        .regex(/^[0-9]{10}$/)
        .messages({ phone: `Phone number must have 10 digits.` }),
    password: JOI.string()
        .min(8)
        .max(30)
        .required()
        .messages({ country_code: `Password must be Provided` }),
});
class CreatedUserResponse {
}
exports.CreatedUserResponse = CreatedUserResponse;
//# sourceMappingURL=create-user.dto.js.map