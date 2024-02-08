import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Charger les données depuis les fichiers JSON
    const poiData = JSON.parse(fs.readFileSync("poi.json", "utf-8"));
    const monumentData = JSON.parse(fs.readFileSync("monument.json", "utf-8"));
    const monumentImageData = JSON.parse(fs.readFileSync("monument_images.json", "utf-8"));
    const imageData = JSON.parse(fs.readFileSync("images.json", "utf-8"));

    // Créer les entrées pour les pois
    for (const poi of Object.values(poiData)) {
      await prisma.poi.create({
        data: {
          id : poi.id+"", //parse en string car c'est ce qui est attendu.
          adresse_forme_editoriale: poi.adresse_forme_editoriale,
          commune: poi.commune,
          code_insee: poi.code_insee,
          position: poi.position,
          monument_id: poi.monument_id + "",
        },
      });
    }

// Créer les entrées pour les monuments
for (const monument of Object.values(monumentData)) {
      
  await prisma.monument.create({
    data: {
      id : monument.id+"",
      poi_id : monument.poi_id,
      is_main: monument.is_main,
      name: monument.name,
      description: monument.description,
      author: monument.author,
      period: monument.period,
    },
  });
}
    
    for (const image of Object.values(imageData)) {
      await prisma.images.create({
        data: {
          id: image.id+"",
          url: image.url,    
          author: image.author,
          source: image.source,
          description: image.description,
          name: image.name,
        },
      });
    }


    for (const image of Object.values(monumentImageData)) {
      await prisma.monument_images.create({
        data: {
          id: image.id+"",
          monument_id: image.monument_id+"",
          image_id: image.image_id+"",
        },
      });
    }

   
 
    console.log("Script d'importation exécuté avec succès !");
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
