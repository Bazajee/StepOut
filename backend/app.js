import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
const TOKEN_KEY = process.env.TOKEN_KEY
const prisma = new PrismaClient()



// ====> Authentification <==============================================================================================================================================================================================================================================================================================================================

app.post ('/api/authentification', async (req, res) => {
	// grab data from request
	const reqData = req.body

	// get user object in the reqData who match with the mail in the request 
	const userObject = await prisma.user.findUnique ({
		where :{
			email : reqData.email,
		}
	})

	// compare bcrypt 
	const compare = await bcrypt.compare(reqData.pwd,userObject.pwdKey)
	if (compare) {
		const token = jwt.sign({}, TOKEN_KEY, { algorithm: 'RS384' })
		res.cookie("authCookie", token, {
			httpOnly: true,
			sameSite: true,
			maxAge: 24*60*60*1000,
		})
		res.send(JSON.stringify(userObject))	
	}
	else {
		return res.status(401).send('Unauthorized')
	}
 })

 app.post('/api/sign_in', (res, req) => {
	const reqData = req.body
	// check existing 

	// if not create 

		// return confirm
	
	//else return error

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