
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard } from '../auth/graphql-auth.guard'
import { CurrentUser } from '../helpers/decorators/decorators'
import { ICurrentUser } from '../user/current-user.interface'
import { User } from '../user/user.model'
import { UserService } from '../user/user.service'

import { CreateTaskInput } from './task.input'
import { Task } from './task.model'
import { TaskService } from './task.service'

@Resolver(() => Task)
export class TaskResolver {
    constructor(private taskService: TaskService, private userService:UserService) {}

    @Query(() => [Task])
    @UseGuards(GqlAuthGuard)
    async tasks(@CurrentUser() user: ICurrentUser) {
      return this.taskService.findAll(user.email)
    }

    @ResolveField()
    async user(@Parent() task: Task) {
      const { user } = task

      return await this.userService.findById(user.toString())
    }

    @Mutation(() => Task)
    @UseGuards(GqlAuthGuard)
    async createTask(@CurrentUser() currentUser: ICurrentUser, @Args('input') input: CreateTaskInput): Promise<Task> {
      try {
        const { name, completed } = input
        const user: User = await this.userService.findByEmail(currentUser.email)
        const task: Task = await this.taskService.createTask(name,completed,currentUser.userId)

        await this.userService.findAndUpdate(currentUser.userId, [...user.tasks, task])

        return task
      }catch(error) {
        throw error
      }
    }

}
