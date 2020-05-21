export class FilePermission {
    public u_id: number;
    public file_id: number;
    public p_type: string;
    constructor(u_id: number,file_id:number,p_type: string)
    {
    this.u_id=u_id;
    this.file_id=file_id;
    this.p_type=p_type;
    }
 }