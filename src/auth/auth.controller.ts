import { Body, Controller,Request, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {
    
}

@Post('login')
async login(@Body() body:any) {
  if (
    body.email === undefined ||
    body.email === '' ||
    body.password === undefined ||
    body.password === ''
  ){
    return {
      message: 'Email and password are required',
      status:401,
    }
  }
  const data = await this.authService.validate(body);
  // validate body have email and password
  if (!data) {
    return {
      message: 'User have wrong email or password',
      status:401,
    }
  }
  return {
    message: 'Login success',
    status:200,
    data
  }
}

@Post('register')
async register(@Body() body:any) {
  // validate body have email and password name
  if (
    body.email === undefined ||
    body.email === '' ||
    body.password === undefined ||
    body.password === '' ||
    body.name === undefined ||
    body.name === ''
  ){
    return {
      message: 'Email, password and name are required',
      status:401,
    }
  }
  const data = await this.authService.register(body);
  return {
    message: data.message,
    status:data.status,
    data
  }

}


@Post('logout')
async logout(@Request() req) {
  req.logout();
}

}