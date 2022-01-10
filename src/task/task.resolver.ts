
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import * as DataLoader from 'dataloader'

import { GqlAuthGuard } from '../auth/graphql-auth.guard'
import { CurrentUser } from '../helpers/decorators/decorators'
import { ICurrentUser } from '../user/current-user.interface'
import { User } from '../user/user.model'
import { UserService } from '../user/user.service'

import { CreateTaskInput } from './task.input'
import { Task } from './task.model'
import { TaskService } from './task.service'
import { TaskOwnerGuard } from './task-owner.guard'

@Resolver(() => Task)
export class TaskResolver {
    constructor(private taskService: TaskService, private userService:UserService) {}

    @Query(() => [Task])
    @UseGuards(GqlAuthGuard)
    async tasks(@CurrentUser() user: ICurrentUser): Promise<Task[]> {
      try {
        return await this.taskService.findAll(user.userId)
      }catch(error) {
        throw error
      }
    }

    @Query(() => Task)
    @UseGuards(GqlAuthGuard,TaskOwnerGuard)
    async task(@Args('id') id:string) {
      try {
        return await this.taskService.findTaskById(id)
      }catch(error) {
        throw error
      }
    }

    @ResolveField()
    async user(@Parent() task: Task, @Context('usersLoader') usersLoader: DataLoader<string, User>) {
      const { user } = task

      return await usersLoader.load(user.toString())
      // return await this.userService.findById(user.toString())
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
