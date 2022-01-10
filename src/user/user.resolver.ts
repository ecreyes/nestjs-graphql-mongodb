import { UseGuards } from '@nestjs/common'
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from '../helpers/decorators/decorators'
import { GqlAuthGuard } from '../auth/graphql-auth.guard'

import { User } from './user.model'
import { UserService } from './user.service'
import { ICurrentUser } from './current-user.interface'
import { TaskService } from '../task/task.service'
import { Task } from '../task/task.model'

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService, private taskService: TaskService) {}

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async user(@CurrentUser() user: ICurrentUser) {
        try {
            return await this.userService.findById(user.userId)
        }catch(error){
            throw error
        }
    }

    @ResolveField()
    async tasks(@Parent() user: User): Promise<Task[]> {
        return await this.taskService.findAll(user.id.toString())
    }
}
