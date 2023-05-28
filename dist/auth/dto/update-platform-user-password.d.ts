import * as JOI from 'joi';
export declare class UpdatePlatformUserPasswordDto {
    email: string;
    old_password: string;
    new_password: string;
}
export declare const UpdatePlatformUserPasswordValidation: JOI.ObjectSchema<any>;
