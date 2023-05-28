import { ConfigModule } from '@nestjs/config';
export declare const jwtFactory: {
    imports: (typeof ConfigModule)[];
    useFactory: () => Promise<{
        secret: string;
        signOptions: {
            expiresIn: string;
        };
    }>;
};
