export interface RoomInfomation {
    userIdA: number;
    userIdB: number;
    roomId: string;
}

export interface Notification {
    user_id: number;
    message: string;
    type: string;
}

export interface UserDAO {
    id: number;
    name: string;
    username: string;
    password: string;
    aboutme: string;
    hobby: string;
    country: string;
    company: string;
    occupation: string;
    icon: string;
    gender: string;
    date_of_birth: Date;
    contact_no: number;
    payme_qr_code: string;
    created_at: Date;
    updated_at: Date;
}
