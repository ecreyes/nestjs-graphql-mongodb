import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@InputType()
export class SignUpInput {
    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    password: string
}

@InputType()
export class LoginInput {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    password: string
}
