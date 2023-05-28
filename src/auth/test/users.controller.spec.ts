import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { CurrentUserDto } from 'src/current-user/dto/user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';


let createUserStub = (): CreateUserDto => {
    return {
        client_id: "7a7258e3-5de8-4910-a75d-ebef93217e87",
        username: "test-user",
        email: "test-user@gmail.com",
        phone_number: "9876543210",
        password: ""
    }
}

let loginUserStub = (): LoginUserDto => {
    return {
        email: "test-user@gmail.com",
        password: ""
    }
}

let CurrentUserStub = (): CurrentUserDto => {
    return {
        user_id: "string",
        client_id: "string",
        username: "string",
        email: "string",
        phone_number: "string"
    }
}

let UpdateUserPasswordStub = (): UpdateUserPasswordDto => {
    return {
        email: "test2@gmail.com",
        password: ""
    }
}

describe('userController', () => {
    let userController: UsersController;
    let userService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [{
                provide: UsersService,
                useValue: {
                    createUser: jest.fn().mockResolvedValue({}),
                    updateUserPassword: jest.fn().mockResolvedValue({}),
                    loginUser: jest.fn().mockResolvedValue({}),
                    getUserByClientId: jest.fn().mockResolvedValue({}),
                    deleteUser: jest.fn().mockResolvedValue({}),
                }
            }],
        }).compile();

        userService = moduleRef.get<UsersService>(UsersService);
        userController = moduleRef.get<UsersController>(UsersController);

    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('create User', () => {
        it('should get a new created User', () => {
            expect(userController.createUser(createUserStub())).resolves.toEqual({});
        });
    });

    describe('getUserClientById', () => {
        it('should get a users by clientId', () => {
            expect(userController.getUserByClientId(CurrentUserStub(), { clientId: "dadfsfs" })).rejects.toThrowError("this.usersService.getUser is not a function");
        });
    });

    describe('login User', () => {
        it('should get a user login', () => {
            expect(userController.loginUser(loginUserStub())).resolves.toEqual({});
        });
    });

    describe('delete Client User', () => {
        it('should delete a client User', () => {
            expect(userController.deleteUser({ id: "test-id" })).resolves.toEqual({});
        });
    });

    describe('get Client User', () => {
        it('should delete a client User', () => {
            expect(userController.getUser(loginUserStub())).rejects.toThrowError("Http Exception");
        });
    });

    describe('update User Password', () => {
        it('should Update User Password', () => {
            expect(userController.updateUserPassword(UpdateUserPasswordStub())).resolves.toEqual({});
        });
    });
})