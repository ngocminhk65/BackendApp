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

  // cehcking token is expired or not
  async checkToken(token: string) {
    try {
      const userToken = await this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  async checkUserPrice(user: User, price: number) {
    if (user.price < price) {
      return {
        canBuy: false,
        messeage: 'You do not have enough money to buy this chapter',
      };
    }
    user.price = user.price - price;
    user.save();
    return {
      canBuy: true,
      messeage: 'You can buy this chapter',
    };
  }

  async addPrice(userId: number, price: any) {
    try {
      if (price == undefined || price == null) {
        return {
          status: 400,
          success: false,
          message: 'price is required',
        };
      }
      if (price <= 0) {
        return {
          status: 400,
          success: false,
          message: 'price must be greater than 0',
        };
      }
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return {
          status: 404,
          success: false,
          message: 'user not found',
        };
      }
      let intPrice = parseInt(price);
      user.price = user.price + intPrice;
      await user.save();
      return {
        status: 200,
        success: true,
        message: 'add price success',
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: error,
      };
    }
  }
}
