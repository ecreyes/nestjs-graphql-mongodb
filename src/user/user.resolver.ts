import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { LoginInput, SignUpInput } from './user.input'
import { Token, User } from './user.model'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation(() => User)
    async signUp(@Args('input') input: SignUpInput) {
        return this.userService.save(input)
    }

    @Mutation(() => Token)
    async login(@Args('input') input: LoginInput) {
        return this.userService.login(input)
    }
}
