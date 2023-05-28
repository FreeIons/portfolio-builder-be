/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import * as JOI from 'joi';

export class UpdateUserPasswordDto {
  @ApiProperty({ description: 'Email', type: String, required: true })
  email: string;
  @ApiProperty({ description: 'Password', type: String, required: true })
  password: string;
}

export const UpdateUserPasswordValidation = JOI.object({
  email: JOI.string().min(6)
    .email({ tlds: { allow: false } })
    .required(),
  password: JOI.string()
    .min(8)
    .max(30)
    .required()
    .messages({ country_code: `Password must be Provided` }),
});

