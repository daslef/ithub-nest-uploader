import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';



@Controller('files')
export class FilesController {
  constructor(
    @InjectQueue('converter') private readonly convertQueue: Queue
  ) { }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10
        })
        .build({
          fileIsRequired: false,
        }),
    ) file: Express.Multer.File,
  ) {
    this.convertQueue.add('webp', {
      data: file.buffer
    })
    return {
      message: "File was queued",
    };
  }
}
