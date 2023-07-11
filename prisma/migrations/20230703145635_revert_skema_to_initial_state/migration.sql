/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `User` table. All the data in the column will be lost.
  - Added the required column `locationLatitude` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationLongitude` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("latitude", "longitude");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "locationId",
ADD COLUMN     "locationLatitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "locationLongitude" DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationLatitude_locationLongitude_fkey" FOREIGN KEY ("locationLatitude", "locationLongitude") REFERENCES "Location"("latitude", "longitude") ON DELETE RESTRICT ON UPDATE CASCADE;
