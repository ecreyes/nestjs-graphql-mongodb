import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { TaskService } from './task.service'

@Injectable()
export class TaskOwnerGuard implements CanActivate {
    constructor(private taskService: TaskService) { }
    async canActivate(context: ExecutionContext) {
        try {
            const ctx = GqlExecutionContext.create(context)
            const { userId } = ctx.getContext().req.user
            const { id } = ctx.getArgs()

            const task = await this.taskService.findTaskById(id)
            if(!task) {
                throw new BadRequestException('task not found')
            } else if (task.user.toString() !== userId ){
                throw new UnauthorizedException('not authorized')
            }

            return true
        }catch(error) {
            return false
        }
    }

}
