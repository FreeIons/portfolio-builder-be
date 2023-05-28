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
exports.UpdatePlatformUserPasswordValidation = exports.UpdatePlatformUserPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const JOI = require("joi");
class UpdatePlatformUserPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email', type: String, required: true }),
    __metadata("design:type", String)
], UpdatePlatformUserPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Old Password', type: String, required: true }),
    __metadata("design:type", String)
], UpdatePlatformUserPasswordDto.prototype, "old_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'New Password', type: String, required: true }),
    __metadata("design:type", String)
], UpdatePlatformUserPasswordDto.prototype, "new_password", void 0);
exports.UpdatePlatformUserPasswordDto = UpdatePlatformUserPasswordDto;
exports.UpdatePlatformUserPasswordValidation = JOI.object({
    email: JOI.string().min(6)
        .email({ tlds: { allow: false } })
        .required(),
    old_password: JOI.string()
        .min(8)
        .max(30)
        .required()
        .messages({ country_code: `Password must be Provided` }),
    new_password: JOI.string()
        .min(8)
        .max(30)
        .required()
        .messages({ country_code: `Password must be Provided` })
});
//# sourceMappingURL=update-platform-user-password.js.map