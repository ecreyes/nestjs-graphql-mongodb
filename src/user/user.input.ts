import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignUpInput {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string
}

@InputType()
export class LoginInput {
    @Field()
    email: string

    @Field()
    password: string
}
