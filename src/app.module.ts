import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AppController } from './app.controller';
import { AudioModule } from './audio/audio.module';
import { TasksModule } from './tasks/tasks.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    AudioModule,
    TasksModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
