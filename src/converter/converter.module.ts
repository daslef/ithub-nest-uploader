import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConverterProcessor } from './converter.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'converter',
    }),
  ],
  controllers: [],
  providers: [ConverterProcessor],
})
export class ConverterModule { }
