import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { User } from '../user/user.model'
import { UserService } from '../user/user.service'

import { Task } from './task.model'
import { TaskService } from './task.service'

@Resolver(() => Task)
export class TaskResolver {
    constructor(private taskService: TaskService, private userService:UserService) {}

    @Query(() => [Task])
    async tasks() {
        return this.taskService.findAll()
    }

    @ResolveField()
    async user(@Parent() user: User) {
      const { id } = user

      return this.userService.findById(id)
    }
}
