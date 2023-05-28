import * as JOI from 'joi';
export declare class UpdateUserPasswordDto {
    email: string;
    password: string;
}
export declare const UpdateUserPasswordValidation: JOI.ObjectSchema<any>;
