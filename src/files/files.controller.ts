import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter.helper';
import { diskStorage } from 'multer';



@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    // limits: { fileSize: 1000 }
    storage: diskStorage({
      destination: './static/uploads',
      // filename: (req, file, cb) => {
      //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      //   const fileName = `${uniqueSuffix}-${file.originalname}`;
      //   cb(null, fileName);
      // }
    })
  }))
  uploadProductFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Make sure the file is an image');
    return {
      fileName: file.originalname,
    };
  }
}
