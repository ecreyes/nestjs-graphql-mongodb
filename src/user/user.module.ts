import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { SharedModule } from '../shared/shared.module'
import { TaskModule } from '../task/task.module'

import { User, UserSchema } from './schemas/user.schema'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        forwardRef(() => TaskModule),
        SharedModule,
    ],
    providers: [
        UserService,
        UserResolver,
    ],
    exports: [
        UserService,
    ],
})
export class UserModule {}
