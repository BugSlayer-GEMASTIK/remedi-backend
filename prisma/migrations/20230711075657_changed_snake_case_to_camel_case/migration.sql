/*
  Warnings:

  - You are about to drop the column `result_document_URL` on the `LabResultUser` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `User` table. All the data in the column will be lost.
  - Added the required column `resultDocumentURL` to the `LabResultUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabResultUser" DROP COLUMN "result_document_URL",
ADD COLUMN     "resultDocumentURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birth_date",
ADD COLUMN     "birthDate" TIMESTAMP(3);
