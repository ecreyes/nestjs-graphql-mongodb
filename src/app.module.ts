import { join } from 'path'

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
// import * as mongoose from 'mongoose'
import { TypegooseModule } from 'nestjs-typegoose'

import { AuthModule } from './auth/auth.module'
import { TaskModule } from './task/task.module'
import { batchUsers } from './user/user.loader'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// mongoose.set('debug', true)

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/nest',{
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    GraphQLModule.forRootAsync({
      imports: [
        UserModule,
      ],
      useFactory: (userService: UserService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema-generated.gql'),
        context: () => ({
          randomValue: Math.random(),
          usersLoader: batchUsers(userService),
        }),
      }),
      inject: [
        UserService,
      ],
    }),
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
