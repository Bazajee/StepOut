-- CreateTable
CREATE TABLE "poi" (
    "id" TEXT NOT NULL,
    "adresse_forme_editoriale" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "code_insee" INTEGER NOT NULL,
    "position" JSONB NOT NULL,
    "monument_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "monument" (
    "id" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "period" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "monument_images" (
    "id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "monument_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "source" TEXT,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poi_id_key" ON "poi"("id");

-- CreateIndex
CREATE UNIQUE INDEX "monument_id_key" ON "monument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "monument_images_id_key" ON "monument_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "monument_images_image_id_key" ON "monument_images"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "monument_images" ADD CONSTRAINT "monument_images_monument_id_fkey" FOREIGN KEY ("monument_id") REFERENCES "monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monument_images" ADD CONSTRAINT "monument_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
