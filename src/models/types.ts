import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type AllergyMedicine = {
    patientEmail: string;
    medicineId: string;
    diagnosedAt: Generated<Timestamp>;
};
export type Diagnose = {
    id: string;
    name: string;
    category: string;
};
export type LabResultCategory = {
    id: string;
    category: string;
};
export type LabResultUser = {
    id: string;
    category: string;
    patientEmail: string;
    result_document_URL: string;
    description: string | null;
    doctorEmail: string;
};
export type Location = {
    latitude: string;
    longitude: string;
};
export type Medicine = {
    id: string;
    name: string;
};
export type MedicineRecord = {
    recordId: string;
    medicineId: string;
    dose: string;
};
export type Record = {
    id: string;
    doctorEmail: string;
    patientEmail: string;
    createdAt: Generated<Timestamp>;
    description: string | null;
    diagnoseId: string | null;
};
export type TreatmentCategory = {
    id: string;
    category: string;
};
export type TreatmentUser = {
    id: string;
    category: string;
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
    birth_date: Timestamp | null;
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
