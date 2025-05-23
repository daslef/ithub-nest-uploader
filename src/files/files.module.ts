import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { BullModule } from '@nestjs/bull';


@Module({
  controllers: [FilesController],
  imports: [
    BullModule.registerQueue({
      name: 'converter',
    }),
  ]
})
export class FilesModule { }
