import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'

import { User } from './user.model'

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {}

    async findById(id: number): Promise<User> {
        return this.userModel.findById(id)
    }

    async findByEmail(email:string): Promise<User> {
        return this.userModel.findOne({ email })
    }
}
