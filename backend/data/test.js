// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
    provider = "prisma-client-js"
  }
  
  model poi {
    id                       String    @unique
    adresse_forme_editoriale String
    commune                  String
    code_insee               Int
    position                 Json
  
    monuments monument?
  }
  
  model monument {
    id          String    @unique
    is_main     Boolean
    name        String
    description String
    author      String
    period      String
  
    poi poi @relation(fields: [poi_id], references: [id])
    poi_id      String  @unique
  
    image       monument_images?         
  }
  
  model monument_images {
    id          Int     @unique
    // image_id                  Images []
    monument monument @relation(fields: [monument_id], references: [id])
    monument_id  String @unique
  
  }
  
  // model Misc_fact {
  //   id                        Int     @id @default(autoincrement())
  //   poi_id                    Int
  //   is_main                   Boolean
  //   name                      String
  //   source                    String
  //   description               String
  //   period                    String
  //   misc_fact_image_id        Int
  
  //   poi                       Poi  @relation(fields: [poi_id], references: [id])
  //   image                     Misc_fact_images @relation(fields: [misc_fact_image_id], references: [id])
  // }
  
  // model Misc_fact_images {
  //   id                        Int      @id @default(autoincrement())
  
  //   image_id                  Images []
  //   misc_fact_id              Misc_fact []
  
  // }
  
  // model Images {
  //   id                        Int      @id @default(autoincrement())
  //   url                       String
  //   author                    String
  //   source                    String
  //   description               String
  //   name                      String
  
  //   image_misc_fact_id        Int
  //   image_monument_id         Int 
  
  //   images_misc_fact_id       Misc_fact_images @relation(fields: [image_misc_fact_id], references: [id])
  //   images_monument_id        Monument_images @relation(fields: [image_monument_id], references: [id])
  // }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  