import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { User } from '../user/user.model'

import { LoginInput, SignUpInput } from './auth.input'
import { AuthService } from './auth.service'
import { Token } from './token.model'

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => User)
    async signUp(@Args('input') input: SignUpInput) {
        return this.authService.save(input)
    }

    @Mutation(() => Token)
    async login(@Args('input') input: LoginInput) {
        return this.authService.login(input)
    }
}
