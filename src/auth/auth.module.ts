import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './jwt.servicer';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'secretKey', // replace with your own secret key
          signOptions: { expiresIn: '60m' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
})
export class AuthModule {}
