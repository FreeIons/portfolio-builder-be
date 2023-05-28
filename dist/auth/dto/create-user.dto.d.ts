import * as JOI from 'joi';
export declare class CreateUserDto {
    client_id: string;
    username: string;
    email: string;
    phone_number: string;
    password: string;
}
export declare const CreateUserValidation: JOI.ObjectSchema<any>;
export declare class CreatedUserResponse {
    _id: string;
    username: string;
    email: string;
    phone_number?: string;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
