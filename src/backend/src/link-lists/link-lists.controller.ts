import { Controller, Post, UseInterceptors, UploadedFile, Get, Param } from '@nestjs/common';
import { LinkListsService } from './link-lists.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvInterceptor } from './utils/csv-interceptor';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/upload-file.dto';

@ApiTags('link-lists')
@Controller('link-lists')
export class LinkListsController {
  constructor(
    private readonly linkListsService: LinkListsService,
  ) {}

  @Get('uploaded-file/:path')
  async getUploadedFile(@Param('path') filePath: string) {
    const response = await this.linkListsService.getUploadedFile(filePath);
    return response;
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), CsvInterceptor)
  @ApiBody({
    description: 'Arquivo CSV contendo dados da lista de links',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.linkListsService.uploadFile(file);

    return { message: 'Dados do CSV salvos no banco de dados com sucesso.', data: response };
  }
}