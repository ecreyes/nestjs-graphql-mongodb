import { Field,ID, ObjectType } from '@nestjs/graphql'

import { User } from '../user/user.model'

@ObjectType()
export class Task {
    @Field(() => ID)
    id: number

    @Field()
    name: string

    @Field()
    completed: boolean

    @Field(() => User)
    user: User
}

