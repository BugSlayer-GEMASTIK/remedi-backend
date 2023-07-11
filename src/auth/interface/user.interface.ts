type User = {
  email: string;
  name: string | null;
  password: string | null;
  role: string | null;
  birthDate: Date | null;
  phoneNumber: string | null;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
};

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}
