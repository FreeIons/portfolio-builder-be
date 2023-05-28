import { ApiProperty } from '@nestjs/swagger';
import * as JOI from 'joi';

export class UpdatePlatformUserPasswordDto {
    @ApiProperty({ description: 'Email', type: String, required: true })
    email: string;
    @ApiProperty({ description: 'Old Password', type: String, required: true })
    old_password: string;
    @ApiProperty({ description: 'New Password', type: String, required: true })
    new_password: string;
}

export const UpdatePlatformUserPasswordValidation = JOI.object({
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