/*
  Warnings:

  - Changed the type of `monument_id` on the `poi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "poi" DROP COLUMN "monument_id",
ADD COLUMN     "monument_id" INTEGER NOT NULL;
