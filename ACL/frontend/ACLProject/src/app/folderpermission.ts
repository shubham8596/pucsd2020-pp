export class FolderPermission {
    public u_id: number;
    public folder_id: number;
    public p_type: string;
    constructor(u_id: number,folder_id:number,p_type: string)
    {
    this.u_id=u_id;
    this.folder_id=folder_id;
    this.p_type=p_type;
    }
 }