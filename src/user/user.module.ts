import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

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
    ],
    providers: [
        UserService,
        UserResolver,
    ],
    exports: [
        MongooseModule,
        UserService,
    ],
})
export class UserModule {}
