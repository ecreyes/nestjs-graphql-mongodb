import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'

import { User } from './user.model'

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {}

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id)
    }

    async findByEmail(email:string): Promise<User> {
        return this.userModel.findOne({ email })
    }

    async findAndUpdate(id, tasks): Promise<User> {
        return this.userModel.findOneAndUpdate({ _id: id },{ tasks }, { new: true })
    }

    async getUsersById(userIds: readonly string[]): Promise<User[]> {
        try{
            const users = await this.userModel.find({ _id: { $in: userIds } })

            return userIds.map(userId => users.find(user => user.id === userId))
        }catch(error) {
            throw error
        }
    }

    async deleteTask(userId: string, taskId: string): Promise<void> {
        try{
            await this.userModel.updateOne({ _id: userId}, { $pull : { tasks : taskId} })
        }catch(error){
            throw error
        }
    }
}
