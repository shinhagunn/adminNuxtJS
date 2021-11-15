export enum UserRole {
    Admin = 'admin',
    Member = 'member',
}

export enum UserState {
    Loading = 'loading',
    Active = 'active',
    Deleted = 'deleted',
}

export default interface auth {
    id: number,
    uid: string,
    bio?: string,
    fullname: string;
    email: string;
    state: UserState;
    role: UserRole;
    authenticated: boolean; 
}


export enum Align {
    Left = "left",
    Center = "center",
    Right = "right"
}
export interface Column {
    key: string;
    title: string;
    class?: string;
    align?: Align;
}
