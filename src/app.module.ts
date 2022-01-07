import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
