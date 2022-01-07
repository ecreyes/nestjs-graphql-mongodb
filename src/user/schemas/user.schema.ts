import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { Task } from '../../task/schemas/task.schema'

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[]
}

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = User & Document
