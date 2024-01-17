import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/api/monument', (req, res) => {
    const filePath = join(__dirname, 'data/monument.json');
    console.log(filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/api/misc_fact', (req, res) => {
	const filePath = join(__dirname, 'data/misc_fact.json');
	console.log(filePath);
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.get('/api/poi', (req, res) => {
	const filePath = join(__dirname, 'data/poi.json');
	console.log(filePath);
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.get('/api/images', (req, res) => {
	const filePath = join(__dirname, 'data/images.json');
	console.log(filePath);
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

app.listen(3500, () => {
    console.log('listening to port 3500');
});