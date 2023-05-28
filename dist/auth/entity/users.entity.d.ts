import mongoose, { Document } from 'mongoose';
export declare class User {
    _id: string;
    email: string;
    username: string;
    phone_number: string;
    password: string;
    is_active: boolean;
}
export declare const usersCollection = "user";
export type UsersDocument = User & Document;
export declare const UsersSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & Required<{
    _id: string;
}>, never>>;
