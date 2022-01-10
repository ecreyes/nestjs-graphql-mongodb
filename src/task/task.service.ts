import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Task, TaskDocument } from './schemas/task.schema'

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    public async findAll(email: string): Promise<Task[]> {
        return this.taskModel.find({ email })
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
