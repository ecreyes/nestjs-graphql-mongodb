import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaskInput {
    @Field()
    name: string

    @Field()
    completed: boolean
}

@InputType()
export class UpdateTaskInput {
    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    completed?: boolean
}
