import { Test } from '@nestjs/testing';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TerminusModule } from "@nestjs/terminus";
import { HealthController } from '../health.controller';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { healthCheckStub } from './stubs/health-check.stubs';
import { HealthModule } from '../health.module';

describe('HealthController', () => {
    let healthController: HealthController;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [TerminusModule, HttpModule],
            controllers: [HealthController],
            providers: [HealthCheckExecutor, HealthCheckService, HttpHealthIndicator],
        }).compile();

        healthController = moduleRef.get<HealthController>(HealthController);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(healthController).toBeDefined();
    });

    describe('Health Check', () => {
        describe('when Health Check is called', () => {
            let health: any;
            beforeEach(async () => {
                health = await healthController.healthStatus();
            });
            test('then is should return Health', () => {
                expect(health).toEqual(healthCheckStub());
            });
        });
    });
})