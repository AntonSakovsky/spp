import * as iconv from 'iconv-lite';
import { diskStorage } from 'multer';

export const multerOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const data = Buffer.from(file.originalname, 'binary');
            const filename = iconv.decode(data, 'utf-8');
            callback(null, filename);
        },
    }),
    fileFilter: (req, file: Express.Multer.File, callback) => {
        if (!file.originalname.match(/.pdf|.txt|.docx|.doc/)) {
            return callback(new Error('Only text files are allowed!'), false);
        }
        callback(null, true);
    },
};
