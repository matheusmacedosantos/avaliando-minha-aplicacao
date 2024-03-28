import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @Type(() => String)
  file: MulterOptions['limits'];
}
