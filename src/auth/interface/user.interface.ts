type User = {
    email: string;
    name: string | null;
    password: string | null;
    role: string | null;
    birth_date: Date | null;
    phoneNumber: string | null;
    locationLatitude: string;
    locationLongitude: string;
}

export interface IAuthenticate {
    readonly user: User;
    readonly token: string;
}