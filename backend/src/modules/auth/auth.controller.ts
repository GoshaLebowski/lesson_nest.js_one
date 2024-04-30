import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "../users/dto";
import {UserLoginDTO} from "./dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthUserResponse} from "./response";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('API')
    @ApiResponse({status: 201})
    @Post('register')
    register (@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.registerUsers(dto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @HttpCode(200)
    @Post('login')
    login (@Body() dto: UserLoginDTO): Promise<any> {
        return this.authService.loginUser(dto)
    }
}
