/*export interface user {
    //id: number;
    loginUser: string;
    password: string;
    //firstName?: string;
    //lastName?: string;
    //role: Role;
    token?: string; 
}*/

export class User {
    userID?: number;    
    username: string;
    password: string;
    vendedorID: number=0;
    liderID: number=0;
    token?: string;
    isDeleting?:boolean;
}

