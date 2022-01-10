import { Field,ID, ObjectType } from '@nestjs/graphql'
import { prop, Ref } from '@typegoose/typegoose'

import { User } from '../user/user.model'

@ObjectType()
export class Task {
    @Field(() => ID)
    id: number

    @Field()
    @prop({ required: true })
    name: string

    @Field()
    @prop({ required: true })
    completed: boolean

    @Field(() => User)
    @prop({ ref: () => User })
    user: Ref<User>
}

