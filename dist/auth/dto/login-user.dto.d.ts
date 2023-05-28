import * as JOI from 'joi';
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare const loginUserValidation: JOI.ObjectSchema<any>;
export declare class LoginUserResponse {
    _id: string;
    username: string;
    email: string;
    phone_number?: string;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
