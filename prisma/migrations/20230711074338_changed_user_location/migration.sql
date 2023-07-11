/*
  Warnings:

  - You are about to drop the column `locationLatitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locationLongitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_locationLatitude_locationLongitude_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "locationLatitude",
DROP COLUMN "locationLongitude",
ADD COLUMN     "kecamatan" TEXT,
ADD COLUMN     "kelurahan" TEXT,
ADD COLUMN     "kota" TEXT,
ADD COLUMN     "provinsi" TEXT;

-- DropTable
DROP TABLE "Location";
