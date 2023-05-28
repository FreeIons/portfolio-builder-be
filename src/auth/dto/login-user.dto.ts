/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import * as JOI from 'joi';

export class LoginUserDto {
  @ApiProperty({ description: 'Email', type: String, required: true })
  email: string;
  @ApiProperty({ description: 'Password', type: String, required: true })
  password: string;
}

export const loginUserValidation = JOI.object({
  email: JOI.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: JOI.string()
    .min(8)
    .max(35)
    .required()
    .messages({ country_code: `Password must be Provided` }),
});

export class LoginUserResponse {
  _id: string;
  username: string;
  email: string;
  phone_number?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
