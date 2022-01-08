import { join } from 'path'

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'

import { SharedModule } from './shared/shared.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema-generated.gql'),
    }),
    TaskModule,
    UserModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
