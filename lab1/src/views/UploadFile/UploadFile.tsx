import React, { FC } from "react";

import { TodoFile } from "../../types/types.js";

type UploadFileProps = {
    todoId: number;
    file?: TodoFile;
};

export const UploadFile: FC<UploadFileProps> = ({ todoId, file }) => {
    return (
        <>
            {file ? (
                <a href={file.src} className="uploaded-file">
                    {file.name}
                </a>
            ) : (
                <form
                    action={`todo/upload/${todoId}`}
                    method="POST"
                    encType="multipart/form-data"
                    className="upload"
                >
                    <label htmlFor="upload-file" className="upload-btn">
                        upload
                        <input
                            type="file"
                            name="file"
                            id="upload-file"
                            required
                            className="upload-file"
                            accept=".txt, .pdf, .js"
                        />
                    </label>
                    <button type="submit" className="upload-submit main-btn">
                        ok
                    </button>
                </form>
            )}
        </>
    );
};
