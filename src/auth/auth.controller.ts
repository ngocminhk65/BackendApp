import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './jwt.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    if (
      body.email === undefined ||
      body.email === '' ||
      body.password === undefined ||
      body.password === ''
    ) {
      return {
        message: 'Email and password are required',
        status: 401,
      };
    }
    const data = await this.authService.validate(body);
    // validate body have email and password
    if (!data) {
      return {
        message: 'User have wrong email or password',
        status: 401,
      };
    }
    return {
      message: 'Login success',
      status: 200,
      data,
    };
  }

  @Post('register')
  async register(@Body() body: any) {
    // validate body have email and password name
    if (
      body.email === undefined ||
      body.email === '' ||
      body.password === undefined ||
      body.password === '' ||
      body.name === undefined ||
      body.name === ''
    ) {
      return {
        message: 'Email, password and name are required',
        status: 401,
      };
    }
    const data = await this.authService.register(body);
    return {
      message: data.message,
      status: data.status,
      data,
    };
  }

  @Post('logout')
  async logout(@Request() req) {
    req.logout();
  }

  @UseGuards(JwtGuard)
  @Post('tranfer_price')
  async tranferPrice(@Body() body: any, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        message: 'User not found',
        status: 401,
      };
    }
    const { price, email } = body;
    if (price === undefined || price === '') {
      return {
        message: 'Price is required',
        status: 401,
      };
    }
    if (email === undefined || email === '') {
      return {
        message: 'Email is required',
        status: 401,
      };
    }
    const data = await this.authService.tranferPrice(email, price, user);
    return data;
  }
  @UseGuards(JwtGuard)
  @Get('list_user')
  async listUser(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      return {
        message: 'User not found',
        status: 401,
      };
    }
    const data = await this.authService.getListUser();
    return data;
  }
}
