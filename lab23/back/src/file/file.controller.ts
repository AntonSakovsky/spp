import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('file')
export class FileController {
    @Get(':filename')
    async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
        console.log(filename);
        const filePath = join(__dirname, '../../', 'uploads', filename); 
        console.log(filePath);
        res.download(filePath, (err) => {
            if (err) {
                res.status(404).send('File not found');
            }
        });
    }
}
