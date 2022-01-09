import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bycriptjs from 'bcryptjs'
import { Model } from 'mongoose'

import { User, UserDocument } from '../user/schemas/user.schema'

import { LoginInput, SignUpInput } from './auth.input'
import { Token } from './token.model'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {}

    public async save(input: SignUpInput): Promise<User> {
        try {
            const { name, email, password } = input
            const user = await this.userModel.findOne({ email })

            if(user) throw new BadRequestException('email already in use')

            const hashedPassword = await bycriptjs.hash(password, 12)
            const newUser = new this.userModel({ name,email,password: hashedPassword })
            const result = await newUser.save()

            return result
        }catch(error) {
            throw error
        }
    }

    public async login(input: LoginInput): Promise<Token> {
        try {
            const { email, password } = input

            const user = await this.userModel.findOne({ email })

            if(!user) throw new BadRequestException('user not found')

            const isValidPassword = await bycriptjs.compare(password,user.password)

            if(!isValidPassword) throw new BadRequestException('incorrect password')

            const token = await this.jwtService.signAsync({ email })

            return { token }
        }catch(error) {
            throw error
        }
    }
}
