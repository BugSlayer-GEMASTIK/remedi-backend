import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type AllergyMedicine = {
  patientEmail: string;
  medicineId: number;
  diagnosedAt: Generated<Timestamp>;
};
export type Diagnose = {
  id: Generated<number>;
  name: string;
  category: string;
};
export type LabResultCategory = {
  id: Generated<number>;
  category: string;
};
export type LabResultUser = {
  id: Generated<number>;
  category: number;
  patientEmail: string;
  resultDocumentURL: string;
  description: string | null;
  doctorEmail: string;
};
export type Location = {
  latitude: string;
  longitude: string;
};
export type Medicine = {
  id: Generated<number>;
  name: string;
};
export type MedicineRecord = {
  recordId: number;
  medicineId: number;
  dose: string;
};
export type Record = {
  id: Generated<number>;
  doctorEmail: string;
  patientEmail: string;
  createdAt: Generated<Timestamp>;
  description: string | null;
  diagnoseId: number | null;
};
export type TreatmentCategory = {
  id: Generated<number>;
  category: string;
};
export type TreatmentUser = {
  id: Generated<number>;
  category: number;
  patientEmail: string;
  treatmentAt: Generated<Timestamp>;
  description: string | null;
  doctorEmail: string;
};
export type User = {
  email: string;
  name: string | null;
  password: string | null;
  role: string | null;
  birthDate: Timestamp | null;
  phoneNumber: string | null;
  locationLatitude: string;
  locationLongitude: string;
};
export type DB = {
  AllergyMedicine: AllergyMedicine;
  Diagnose: Diagnose;
  LabResultCategory: LabResultCategory;
  LabResultUser: LabResultUser;
  Location: Location;
  Medicine: Medicine;
  MedicineRecord: MedicineRecord;
  Record: Record;
  TreatmentCategory: TreatmentCategory;
  TreatmentUser: TreatmentUser;
  User: User;
};
