import { forwardRef,Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UserModule } from '../user/user.module'

import { Task } from './task.model'
import { TaskResolver } from './task.resolver'
import { TaskService } from './task.service'

@Module({
    imports: [
        TypegooseModule.forFeature([Task]),
        forwardRef(() => UserModule),
    ],
    providers: [
        TaskService,
        TaskResolver,
    ],
    exports: [
        TaskService,
    ]
})
export class TaskModule {}
