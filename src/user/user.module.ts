import { forwardRef, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TaskService } from '../task/task.service'

import { TaskModule } from '../task/task.module'

import { User } from './user.model'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
    imports: [
        TypegooseModule.forFeature([User]),
        forwardRef(() => TaskModule),
    ],
    providers: [
        UserService,
        UserResolver,
    ],
    exports: [
        TypegooseModule,
        UserService,
    ],
})
export class UserModule {}
