export interface Email {
    subject:    string;
    message:    string;
    name_email: string;
    area:       string;
    status_id:  number;
    files:      File[];
    status_files: number;
}

export interface File {
    file: string;
}