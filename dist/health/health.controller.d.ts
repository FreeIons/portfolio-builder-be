import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private http;
    constructor(health: HealthCheckService, http: HttpHealthIndicator);
    healthStatus(): {
        status: string;
    };
}
