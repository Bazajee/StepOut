
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const PORT = process.env.PORT
const TOKEN_KEY = process.env.TOKEN

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

const prisma = new PrismaClient()
console.log("tk",process.env.TOKEN)

app.use(express.json())


// ====> Authentification <==============================================================================================================================================================================================================================================================================================================================

app.post ('/api/authentification',async (req, res) => {
	// grab data from request
	const reqData = req.body
	// get user object in the reqData who match with the mail in the request 
	const userObject = await prisma.user.findUnique ({
		where :{
			email : reqData.email,
		}
	})
	// compare hash from db with pwd from req
	const compare = await bcrypt.compare(reqData.pwd, userObject.passwordHash)
	//send cookie if compare true
	if (compare) {
		const token = jwt.sign({}, TOKEN_KEY,)
		res.cookie("authCookie", token, {
			httpOnly: true,
			sameSite: true,
			maxAge: 24*60*60*1000,
		})
		res.send(JSON.stringify(userObject.email, userObject.name, userObject.firstName))	
	}
	else {
		return res.status(401).send('Unauthorized')
	}
 })

 app.post('/api/sign_in',async (req, res) => {
	const reqData = req.body
	// check existing
	const userObject = await prisma.user.findUnique ({
		where :{
			email : reqData.email,
		}
	})
	// if not existing create 
	if (!userObject) {
		await prisma.user.create({
			data: {
				email: reqData.email, 
				name: reqData.name,
				firstName: reqData.firstName
			}
		})
		res.send(true)
	}
	// return error
	else {
		return res.status(404).send('Not found')
	}





 })

// ===================================================================================================================================================================================================================================================================================================================================================

app.get('/api/monument', (req, res) => {
    const filePath = join(__dirname, 'data/monument.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/api/misc_fact', (req, res) => {
	const filePath = join(__dirname, 'data/misc_fact.json');
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.get('/api/poi', (req, res) => {
	const filePath = join(__dirname, 'data/poi.json');
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.get('/api/images', (req, res) => {
	const filePath = join(__dirname, 'data/images.json');
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.get('/api/monumentimage', (req, res) => {
	const filePath = join(__dirname, 'data/monument.images.json');
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});


app.get('/api/missfactimage', (req, res) => {
	const filePath = join(__dirname, 'data/misc_fact.json');
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.use('/backend/data/images', express.static(join(__dirname, 'backend/data/images')));

// Route pour envoyer un fichier image spécifique
app.get('/api/getImage/:filename', (req, res) => {

  const filename = req.params.filename;
  const imagePath = join(__dirname, '/data/images', filename);
  // Envoyer le fichier image
  res.sendFile(imagePath);
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});