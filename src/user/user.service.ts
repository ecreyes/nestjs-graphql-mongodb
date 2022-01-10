import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findById(id: number): Promise<User> {
        return this.userModel.findById(id)
    }

    async findByEmail(email:string): Promise<User> {
        return this.userModel.findOne({ email })
    }
}
