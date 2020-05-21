export class User {
    public u_id: number;
    public u_firstname: string;
    public u_lastname: string;
    public u_password: string;
    constructor(u_id: number,u_firstname: string,u_lastname: string,u_password:string)
    {
    this.u_id=u_id;
    this.u_firstname=u_firstname;
    this.u_lastname=u_lastname;
    this.u_password=u_password;
    }
 }