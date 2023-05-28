import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { User } from './entity/users.entity';
export declare class AuthRepository {
    userModel: Model<User>;
    connection: Connection;
    protected readonly logger: Logger;
    constructor(userModel: Model<User>, connection: Connection);
}
