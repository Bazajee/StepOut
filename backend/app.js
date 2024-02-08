
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const PORT = process.env.PORT;
const TOKEN_KEY = process.env.TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ====> Authentification <==============================================================================================================================================================================================================================================================================================================================

app.post("/api/authentification", async (req, res) => {
  // grab data from request
  const reqData = req.body;
  // get user object in the reqData who match with the mail in the request
  const userObject = await prisma.user.findUnique({
    where: {
      email: reqData.email,
    },
  });
  // compare hash from db with pwd from req
  const compare = await bcrypt.compare(
    reqData.password,
    userObject.passwordHash
  );
  //send cookie if compare true
  if (compare) {
    const token = jwt.sign({}, TOKEN_KEY);
    res.cookie("authCookie", token, {
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send(
      JSON.stringify({email: userObject.email, name:userObject.name, firstName: userObject.firstName})
    ) 
  } else {
    return res.status(401).send("Unauthorized");
  }
});

app.post("/api/sign_in", async (req, res) => {
  const reqData = req.body;
  // check existing
  const userObject = await prisma.user.findUnique({
    where: {
      email: reqData.email,
    },
  });
  // if not existing create
  if (!userObject) {
    const hash = await bcrypt.hash(reqData.password, 10);
    await prisma.user.create({
      data: {
        email: reqData.email,
        name: reqData.name,
        firstName: reqData.firstName,
        passwordHash: hash,
      },
    });
    res.status(200).send(true);
  }
  // return error
  else {
    res.status(404).send("Not found");
  }
});

// ===================================================================================================================================================================================================================================================================================================================================================
//
// app.get("/api/monument", (req, res) => {
//   const filePath = join(__dirname, "data/monument.json");
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });
// });

app.get("/api/monument", async (req, res) => {
  try {
    const monumentsList = await prisma.monument.findMany();
    const monumentsObject = {};
    for (const monument of monumentsList) {
      monumentsObject[monument.id] = monument;
    }
    // console.log("monumentsList", monumentsObject);
    res.send(monumentsObject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get('/api/misc_fact', (req, res) => {
// 	const filePath = join(__dirname, 'data/misc_fact.json');
// 	res.sendFile(filePath, (err) => {
// 		 if (err) {
// 			  console.error(err);
// 			  res.status(500).send('Internal Server Error');
// 		 }
// 	});
// });

// app.get('/api/poi', (req, res) => {
// 	const filePath = join(__dirname, 'data/poi.json');
// 	res.sendFile(filePath, (err) => {
// 		 if (err) {
// 			  console.error(err);
// 			  res.status(500).send('Internal Server Error');
// 		 }
// 	});
// });

app.get("/api/poi", async (req, res) => {
  try {
    const poisList = await prisma.poi.findMany();
    const poisObject = {};
    for (const poi of poisList) {
      poisObject[poi.id] = poi;
    }
    console.log("pois", poisList);
    res.send(poisObject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/api/images", (req, res) => {
//   const filePath = join(__dirname, "data/images.json");
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });
// });

app.get("/api/images", async (req, res) => {
  try {
    const imagesList = await prisma.images.findMany();
    const imagesObject = {};
    for (const image of imagesList) {
      imagesObject[image.id] = image;
    }
    // console.log("images", imagesObject);
    res.send(imagesObject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/api/monumentimage", (req, res) => {
//   const filePath = join(__dirname, "data/monument_images.json");
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });
// });

app.get("/api/monumentimage", async (req, res) => {
  try {
    const monumentimagesList = await prisma.monument_images.findMany();
    const monumentimagesObject = {};
    for (const monumentimage of monumentimagesList) {
      monumentimagesObject[monumentimage.id] = monumentimage;
    }
    // console.log("monumentimages", monumentimagesObject);
    res.send(monumentimagesObject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get('/api/missfactimage', (req, res) => {
// 	const filePath = join(__dirname, 'data/misc_fact.json');
// 	res.sendFile(filePath, (err) => {
// 		 if (err) {
// 			  console.error(err);
// 			  res.status(500).send('Internal Server Error');
// 		 }
// 	});
// });

app.use(
  "/backend/data/images",
  express.static(join(__dirname, "backend/data/images"))
);

// Route pour envoyer un fichier image spécifique

app.get("/api/getImage/:filename", (req, res) => {

  const filename = req.params.filename;
  const imagePath = join(__dirname, "/data/images", filename);
  // Envoyer le fichier image
  res.sendFile(imagePath);
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
