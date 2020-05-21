export class Directory {
    public folder_id: number;
    public folder_name: string;
    public folder_path: string;
    constructor(folder_id: number,folder_name: string,folder_path:string)
    {
    this.folder_id=folder_id;
    this.folder_name=folder_name;
    this.folder_path=folder_path;
    }
 }