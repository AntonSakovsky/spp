import { gql } from "@apollo/client";

export const DOWNLOAD_FILE = gql`
query DownloadFile($filename: String!) {
    downloadFile(filename: $filename)
}
`;