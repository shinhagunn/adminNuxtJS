export default interface auth {
    user: string;
    pass: string;
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
