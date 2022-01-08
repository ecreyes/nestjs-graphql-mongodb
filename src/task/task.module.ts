import { forwardRef,Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from '../user/user.module'

import { Task, TaskSchema } from './schemas/task.schema'
import { TaskResolver } from './task.resolver'
import { TaskService } from './task.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Task.name,
                schema: TaskSchema,
            },
        ]),
        forwardRef(() => UserModule),
    ],
    providers: [
        TaskService,
        TaskResolver,
    ],
})
export class TaskModule {}
