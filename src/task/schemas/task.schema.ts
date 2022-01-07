import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { User } from '../../user/schemas/user.schema'

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: Boolean, required: true })
  completed:boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

export const TaskSchema = SchemaFactory.createForClass(Task)

export type TaskDocument = Task & Document
