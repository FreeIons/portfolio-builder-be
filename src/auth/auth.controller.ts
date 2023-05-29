import {
    Body,
    Controller,
    Post,
    HttpStatus,
    Logger,
    Get,
    Param,
    Delete,
    Put
  } from '@nestjs/common';
  import {
    CreatedUserResponse,
    CreateUserDto,
    CreateUserValidation,
  } from './dto/create-user.dto';
  import { AuthService } from './auth.service';
  import { Role } from '../role/role-guard';
  import { Roles } from '../role/role-decorators';
  import { ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { HttpError } from '../errors/custom.errors';
  import {
    LoginUserDto,
    LoginUserResponse,
    loginUserValidation,
  } from './dto/login-user.dto';
  import { CurrentUser } from '../current-user/current-user.decorator';
  import { UpdateUserPasswordDto, UpdateUserPasswordValidation } from './dto/update-user-password.dto';
  import { CurrentUserDto } from '../current-user/dto/user.dto';
  import { UpdatePlatformUserPasswordDto, UpdatePlatformUserPasswordValidation } from './dto/update-platform-user-password';
  
  @Controller('auth')
  export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly AuthService: AuthService) { }
  
    @Post('/signup')
    @Roles(Role.PLATFORM_USER)
    @ApiOperation({
      summary: 'Create User',
      description: 'Create User Description',
    })
    @ApiResponse({
      status: 201,
      description: 'The User has been successfully created',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({
      status: HttpStatus.PRECONDITION_FAILED,
      description: 'Failed Precondition.',
    })
    @ApiResponse({
      status: 422,
      description: 'The User already exist with this email or phone',
    })
    async createUser(
      @Body() request: CreateUserDto,
    ): Promise<CreatedUserResponse> {
      try {
        await CreateUserValidation.validateAsync(request);
      } catch (err) {
        this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
        throw HttpError(
          HttpStatus.PRECONDITION_FAILED,
          `Invalid Request object:${err.message}`,
        );
      }
      return this.AuthService.createUser(request);
    }
  
    @Put('/admin/update-password')
    @Roles(Role.ADMIN)
    @ApiOperation({
      summary: 'Update User Password',
      description: 'Update User Password Description',
    })
    @ApiResponse({
      status: 201,
      description: 'The User Password has been successfully updated',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({
      status: HttpStatus.PRECONDITION_FAILED,
      description: 'Failed Precondition.',
    })
    @ApiResponse({
      status: 404,
      description: `The User doesn't exist with this email or phone`,
    })
    async updateUserPassword(
      @Body() request: UpdateUserPasswordDto,
    ): Promise<CreatedUserResponse> {
      try {
        await UpdateUserPasswordValidation.validateAsync(request);
      } catch (err) {
        this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
        throw HttpError(
          HttpStatus.PRECONDITION_FAILED,
          `Invalid Request object:${err.message}`,
        );
      }
      return this.AuthService.updateUserPassword(request);
    }
  
    @Put('/update-password')
    @Roles(Role.PLATFORM_USER)
    @ApiOperation({
      summary: 'Update User Password',
      description: 'Update User Password Description',
    })
    @ApiResponse({
      status: 201,
      description: 'The User Password has been successfully updated',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({
      status: HttpStatus.PRECONDITION_FAILED,
      description: 'Failed Precondition.',
    })
    @ApiResponse({
      status: 404,
      description: `The User doesn't exist with this email or phone`,
    })
    async updatePlatformUserPassword(
      @Body() request: UpdatePlatformUserPasswordDto,
    ) {
      try {
        await UpdatePlatformUserPasswordValidation.validateAsync(request);
      } catch (err) {
        this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
        throw HttpError(
          HttpStatus.PRECONDITION_FAILED,
          `Invalid Request object:${err.message}`,
        );
      }
      return this.AuthService.updatePlatformUserPassword(request);
    }
  
    @Post('/signin')
    @Roles(Role.PLATFORM_USER)
    @ApiOperation({
      summary: 'Signin User',
      description: 'Create User Description',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'The User has been successfully Signin',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({
      status: HttpStatus.PRECONDITION_FAILED,
      description: 'Failed Precondition.',
    })
    @ApiResponse({
      status: 422,
      description: 'The User already exist with this email or phone',
    })
    async loginUser(@Body() request: LoginUserDto): Promise<any> {
      try {
        await loginUserValidation.validateAsync(request);
      } catch (err) {
        this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
        throw HttpError(
          HttpStatus.PRECONDITION_FAILED,
          `Invalid Request object:${err.message}`,
        );
      }
      return this.AuthService.loginUser(request);
    }
  
    @Get('/get-user')
    @Roles(Role.PLATFORM_USER)
    @ApiOperation({
      summary: 'Get User',
      description: 'Get User Description',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'The User successfully found',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({
      status: HttpStatus.PRECONDITION_FAILED,
      description: 'Failed Precondition.',
    })
    async getUser(@CurrentUser() platform_user): Promise<any> {
      
      return this.AuthService.getUser(platform_user);
    }
  
     
    @Delete('/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({
      summary: 'Delete User by Id',
      description: 'Delete User Description',
    })
    @ApiResponse({
      status: HttpStatus.ACCEPTED,
      description: 'The User has been successfully Deleted',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiResponse({
      status: HttpStatus.PRECONDITION_FAILED,
      description: 'Failed Precondition.',
    })
    async deleteUser(@Param() param: { id: string }) {
      return await this.AuthService.deleteUser(param.id);
    }
  }
  