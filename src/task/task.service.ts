import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Task, TaskDocument } from './schemas/task.schema'

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    public async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec()
    }
}
