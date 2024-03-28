import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import * as fs from 'fs';
  import * as path from 'path';
  
  @Injectable()
  export class CsvInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      if (req.file) {
        const { path: filePath, originalname } = req.file;
        const temporaryPath = path.resolve(__dirname, '../../', 'temp', originalname);
        fs.copyFileSync(filePath, temporaryPath); // copiar o arquivo para o diretório temporário
        req.file['temporaryPath'] = temporaryPath; // adicionar o caminho temporário ao objeto de solicitação
      }
      return next.handle().pipe(
        tap(() => {
          if (req.file && req.file.temporaryPath) {
            fs.unlinkSync(req.file.temporaryPath); // excluir o arquivo temporário após o uso
          }
        }),
      );
    }
  }
  