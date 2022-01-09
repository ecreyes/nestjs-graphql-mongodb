import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from 'src/user/user.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '6h' },
        }),
        UserModule,
    ],
    providers: [
        AuthService,
        AuthResolver,
    ],
    exports: [
        JwtModule,
    ],
})
export class AuthModule {}
