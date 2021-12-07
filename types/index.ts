export enum UserRole {
    Admin = 'admin',
    Member = 'member',
    Collaborator = 'collaborator'
}

export enum ModeTable {
    Link = 'Link',
    Normal = 'Normal'
}

export enum UserState {
    Pending = 'pending',
    Active = 'active',
    Deleted = 'deleted',
    Banned = 'banned'
}

export enum MusicState {
    Pending = 'pending',
    Active = 'active',
    Deleted = 'deleted',
    Rejected = 'rejected'
}

export interface Reply{
    id: number;
    user_uid: string;
    first_name: string;
    last_name: string;
    content: string;
    like_count: number;
    created_at: string;
    updated_at?: string;
}

export interface User {
    id: number;
    uid: string;
    bio?: string | null;
    first_name: string;
    last_name: string;
    email: string;
    state: UserState;
    role: UserRole;
    created_at: string;
    updated_at?: string;
}

export interface Music {
    id: number;
    user_uid: string;
    description: string | null;
    name: string;
    author: string;
    state: UserState;
    view_count: number;
    created_at: string;
    updated_at?: string;
}

export interface Album {
    id: number;
    user_uid: string;
    name: string;
    description: string | null;
    view_count: number;
    music: Music;
    created_at: string;
    updated_at?: string;
}

export interface Comment {
    id: number;
    user_uid: string;
    first_name: string;
    last_name: string;
    content: string;
    like_count: number;
    replies: Reply [];
    created_at: string;
    updated_at?: string;
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

export interface Filter {
    id: number;
    default: string;
    type?: any;
    title: string;
    transform: string;
}

export enum NotificationType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warn = 'warn'
  }

  
  export enum Placement {
    BottomLeft = "bottomLeft",
    BottomCenter = "bottomCenter",
    BottomRight = "bottomRight",
    TopLeft = "topLeft",
    TopCenter = "topCenter",
    TopRight = "topRight",
  }

  
  export interface NotificationOptions {
    title: string;
    description?: string;
    placement?: Placement;
    duration?: number;
  }
  
