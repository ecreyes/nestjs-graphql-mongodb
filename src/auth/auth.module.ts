import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from 'src/user/user.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '6h' },
        }),
        UserModule,
    ],
    providers: [
        AuthService,
        AuthResolver,
        JwtStrategy,
    ],
    exports: [
        JwtModule,
    ],
})
export class AuthModule {}
