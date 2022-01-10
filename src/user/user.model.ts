import { Field, HideField, ID, ObjectType } from '@nestjs/graphql'
import { prop, Ref } from '@typegoose/typegoose'

import { Task } from '../task/task.model'

@ObjectType()
export class User {
    @Field(() => ID)
    id: number

    @Field()
    @prop()
    name: string

    @Field()
    @prop({ unique: true })
    email: string

    @HideField()
    @prop({ required: true })
    password: string

    @Field(() => [Task], { nullable: true })
    @prop({ ref: () => Task })
    tasks?: Ref<Task[]>
}
