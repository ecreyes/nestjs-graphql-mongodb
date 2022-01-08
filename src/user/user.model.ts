import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Task } from '../task/task.model'

@ObjectType()
export class User {
    @Field(() => ID)
    id: number

    @Field()
    name: string

    @Field()
    email: string

    @Field(() => [Task], { nullable: true })
    tasks?: Task[]
}

@ObjectType()
export class Token {
    @Field()
    token: string
}

