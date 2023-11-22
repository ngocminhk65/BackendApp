import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserProvider } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtGuard } from './jwt.gaurd';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...UserProvider, JwtGuard],
  exports: [...UserProvider, JwtStrategy, AuthService],
})
export class AuthModule {}
