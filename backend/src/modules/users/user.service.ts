import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto";
import {AppError} from "../../common/errors";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({ where: {email} });
    }

    async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
        const existUser = this.findUserByEmail(dto.email)
        if (existUser) throw new BadRequestException(AppError.USER_EXISTS);
        dto.password = await this.hashPassword(dto.password);
        await this.userRepository.create({
            firstName: dto.firstName,
            username: dto.username,
            email: dto.email,
            password: dto.password,
        });
        return dto;
    }
}