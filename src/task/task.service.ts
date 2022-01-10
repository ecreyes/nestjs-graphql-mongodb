import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'

import { Task } from './task.model'

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>) {}

    public async findAll(id: string): Promise<Task[]> {
        return this.taskModel.find({ user: id })
    }

    public async createTask(name: string,completed:boolean,user:string): Promise<Task> {
        try {
            const newTask = new this.taskModel({ name,completed,user })
            const task = await newTask.save()

            return task
        }catch(error) {
            throw error
        }

    }
}
