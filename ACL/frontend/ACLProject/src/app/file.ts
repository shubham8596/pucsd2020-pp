export class File {
    public file_id: number;
    public file_name: string;
    public file_path: string;
    constructor(file_id: number,file_name: string,file_path:string)
    {
    this.file_id=file_id;
    this.file_name=file_name;
    this.file_path=file_path;
    }
 }