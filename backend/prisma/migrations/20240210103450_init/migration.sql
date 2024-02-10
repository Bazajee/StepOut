/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monument_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monument" DROP CONSTRAINT "monument_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "monument_images" DROP CONSTRAINT "monument_images_image_id_fkey";

-- DropForeignKey
ALTER TABLE "monument_images" DROP CONSTRAINT "monument_images_monument_id_fkey";

-- DropTable
DROP TABLE "images";

-- DropTable
DROP TABLE "monument";

-- DropTable
DROP TABLE "monument_images";

-- DropTable
DROP TABLE "poi";

-- CreateTable
CREATE TABLE "Poi" (
    "id" TEXT NOT NULL,
    "adresse_forme_editoriale" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "code_insee" INTEGER NOT NULL,
    "position" JSONB NOT NULL,
    "monument_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Monument" (
    "id" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "poi_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Monument_images" (
    "id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "monument_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "source" TEXT,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Poi_id_key" ON "Poi"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Poi_monument_id_key" ON "Poi"("monument_id");

-- CreateIndex
CREATE UNIQUE INDEX "Monument_id_key" ON "Monument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Monument_poi_id_key" ON "Monument"("poi_id");

-- CreateIndex
CREATE UNIQUE INDEX "Monument_images_id_key" ON "Monument_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Monument_images_image_id_key" ON "Monument_images"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Images_id_key" ON "Images"("id");

-- AddForeignKey
ALTER TABLE "Poi" ADD CONSTRAINT "Poi_monument_id_fkey" FOREIGN KEY ("monument_id") REFERENCES "Monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monument_images" ADD CONSTRAINT "Monument_images_monument_id_fkey" FOREIGN KEY ("monument_id") REFERENCES "Monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monument_images" ADD CONSTRAINT "Monument_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
