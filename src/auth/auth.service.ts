import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.enity';
const bcrypt = require('bcrypt');
const salt = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}

  async validate(payload: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (isMatch) {
      const jwt = this.jwtService.sign(payload);
      //delete user.password;
      user.password = undefined;
      // append jwt to user
      return {
        user,
        jwt,
      };
    }
    return null;
  }

  async register(body: any) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return {
        message: 'Email already exists',
        status: 401,
      };
    }
    const hash = await bcrypt.hash(body.password, salt);
    const data = await this.userRepository.create({
      email: body.email,
      password: hash,
      username: body.name,
    });
    data.password = undefined;
    return {
      message: 'Register success',
      status: 200,
      data,
    };
  }
  async getUserByToken(token: string) {
    try {
      const userToken = await this.jwtService.verify(token);
      return await this.getUserByEmail(userToken.email);
    } catch (error) {
        return null;
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
