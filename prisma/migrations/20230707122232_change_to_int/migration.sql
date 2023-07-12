-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT,
    "birth_date" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "locationLatitude" DECIMAL(65,30) NOT NULL,
    "locationLongitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "doctorEmail" TEXT NOT NULL,
    "patientEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "diagnoseId" INTEGER,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnose" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Diagnose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineRecord" (
    "recordId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "dose" TEXT NOT NULL,

    CONSTRAINT "MedicineRecord_pkey" PRIMARY KEY ("recordId","medicineId")
);

-- CreateTable
CREATE TABLE "AllergyMedicine" (
    "patientEmail" TEXT NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "diagnosedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AllergyMedicine_pkey" PRIMARY KEY ("patientEmail","medicineId")
);

-- CreateTable
CREATE TABLE "TreatmentCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "TreatmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentUser" (
    "id" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "patientEmail" TEXT NOT NULL,
    "treatmentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "doctorEmail" TEXT NOT NULL,

    CONSTRAINT "TreatmentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabResultCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "LabResultCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabResultUser" (
    "id" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "patientEmail" TEXT NOT NULL,
    "result_document_URL" TEXT NOT NULL,
    "description" TEXT,
    "doctorEmail" TEXT NOT NULL,

    CONSTRAINT "LabResultUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("latitude","longitude")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationLatitude_locationLongitude_fkey" FOREIGN KEY ("locationLatitude", "locationLongitude") REFERENCES "Location"("latitude", "longitude") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_diagnoseId_fkey" FOREIGN KEY ("diagnoseId") REFERENCES "Diagnose"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_patientEmail_fkey" FOREIGN KEY ("patientEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRecord" ADD CONSTRAINT "MedicineRecord_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRecord" ADD CONSTRAINT "MedicineRecord_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllergyMedicine" ADD CONSTRAINT "AllergyMedicine_patientEmail_fkey" FOREIGN KEY ("patientEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllergyMedicine" ADD CONSTRAINT "AllergyMedicine_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentUser" ADD CONSTRAINT "TreatmentUser_category_fkey" FOREIGN KEY ("category") REFERENCES "TreatmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentUser" ADD CONSTRAINT "TreatmentUser_patientEmail_fkey" FOREIGN KEY ("patientEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResultUser" ADD CONSTRAINT "LabResultUser_category_fkey" FOREIGN KEY ("category") REFERENCES "LabResultCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResultUser" ADD CONSTRAINT "LabResultUser_patientEmail_fkey" FOREIGN KEY ("patientEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
