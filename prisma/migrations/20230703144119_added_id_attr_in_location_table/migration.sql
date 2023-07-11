/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locationLatitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locationLongitude` on the `User` table. All the data in the column will be lost.
  - The required column `id` was added to the `Location` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `locationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_locationLatitude_locationLongitude_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "locationLatitude",
DROP COLUMN "locationLongitude",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
