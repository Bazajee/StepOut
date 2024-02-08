/*
  Warnings:

  - A unique constraint covering the columns `[poi_id]` on the table `monument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `poi_id` to the `monument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monument" ADD COLUMN     "poi_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "monument_poi_id_key" ON "monument"("poi_id");

-- AddForeignKey
ALTER TABLE "monument" ADD CONSTRAINT "monument_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "poi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
