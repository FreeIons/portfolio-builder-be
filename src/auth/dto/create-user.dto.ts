/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import * as JOI from 'joi';

export class CreateUserDto {
  @ApiProperty({ description: 'Client Id', type: String, required: true })
  client_id: string;
  @ApiProperty({ description: 'UserName', type: String, required: true })
  username: string;
  @ApiProperty({ description: 'Email', type: String, required: true })
  email: string;
  @ApiProperty({ description: 'Phone Number', type: String, required: false })
  phone_number: string;
  @ApiProperty({ description: 'Password', type: String, required: true })
  password: string;
}

export const CreateUserValidation = JOI.object({
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

export class CreatedUserResponse {
  _id: string;
  username: string;
  email: string;
  phone_number?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
