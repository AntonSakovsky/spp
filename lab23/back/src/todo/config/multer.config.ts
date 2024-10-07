import { diskStorage } from 'multer';

export const multerOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        },
    }),
    fileFilter: (req, file: Express.Multer.File, callback) => {
        if (!file.originalname.match(/.pdf|.txt|.docx|.doc/)) {
            return callback(new Error('Only text files are allowed!'), false);
        }
        callback(null, true);
    },
};
